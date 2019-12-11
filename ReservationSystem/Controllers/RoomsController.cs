using System;
using System.Drawing;
using System.Globalization;
using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [Authorize]
        [HttpPost("add")]
        public IActionResult Add([FromForm]RoomCreationViewModel roomCreationData)
        {
            if (!ModelState.IsValid)
                return Ok();

            var image = ConvertFormFileToImage(roomCreationData.Image);
            var room = _mapper.Map<RoomCreationDTO>(roomCreationData);
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
        public IActionResult Delete(Guid roomId)
        {
            return Ok();
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery]RoomSearchData roomSearchData)
        {
            var provider = new CultureInfo("pl-PL");
            var stayStart = DateTime.ParseExact(roomSearchData.StayStart, "dd-MM-yyyy", provider);
            var stayEnd = DateTime.ParseExact(roomSearchData.StayEnd, "dd-MM-yyyy", provider);
            return Ok();
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
