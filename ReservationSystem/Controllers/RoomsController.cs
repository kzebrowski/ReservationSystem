using System;
using System.Drawing;
using System.Globalization;
using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Common;
using ReservationSystem.ViewModels;
using Services;
using Services.Models;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        //Actions such as Delete, Edit and Add, should be accessed only by admin
        private readonly IRoomsService _roomsService;
        private readonly IMapper _mapper;

        public RoomsController(IRoomsService roomsService, IMapper mapper)
        {
            _roomsService = roomsService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var rooms = _roomsService.GetAll();

            return Ok(rooms);
        }

        [HttpGet("{roomId}")]
        public IActionResult Get(Guid roomId)
        {
            var room = _roomsService.GetRoom(roomId);

            return Ok(room);
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult Add([FromForm]RoomCreationViewModel roomCreationData)
        {
            if (!ModelState.IsValid)
                return Ok();

            var image = ConvertFormFileToImage(roomCreationData.Image);
            var room = _mapper.Map<RoomCreationDto>(roomCreationData);
            room.Image = image;
            var createdRoom = _roomsService.Add(room);

            return Ok(createdRoom);
        }

        [Authorize]
        public IActionResult Edit(Room candidateRoom)
        {
            return Ok();
        }

        [Authorize]
        [HttpDelete("[action]")]
        public IActionResult Delete([FromBody]Guid roomId)
        {
            var room = _roomsService.GetRoom(roomId);
            if (room is null)
                return Ok(new ValidationError {Field = "roomId", Message = "Pokój o podanym Id nie istnieje"});

            _roomsService.Delete(room);

            return Ok();
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult Update([FromForm]RoomUpdateViewModel roomUpdateData)
        {
            var room = _roomsService.GetRoom(roomUpdateData.Id);
            if (room is null)
                return Ok(new ValidationError { Field = "roomId", Message = "Pokój o podanym Id nie istnieje" });

            if (!ModelState.IsValid)
                return Ok();

            var roomUpdateDto = _mapper.Map<RoomUpdateDto>(roomUpdateData);
            roomUpdateDto.ImageUrl = room.ImageUrl;

            if (roomUpdateData.Image != null)
                roomUpdateDto.Image = ConvertFormFileToImage(roomUpdateData.Image);

            var updatedRoom = _roomsService.Update(roomUpdateDto);
            return Ok(updatedRoom);
        }

        [HttpGet("[action]")]
        public IActionResult Search([FromQuery]RoomSearchData roomSearchData)
        {
            var provider = new CultureInfo("pl-PL");

            var rooms = _roomsService.GetRooms(roomSearchData.Guests, roomSearchData.StayStart, roomSearchData.StayEnd);

            return Ok(rooms);
        }

        private Image ConvertFormFileToImage(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var image = Image.FromStream(memoryStream);
                return image;
            }
        }
    }
}
