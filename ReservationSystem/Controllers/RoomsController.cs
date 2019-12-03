using System;
using System.Drawing.Imaging;
using System.Globalization;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        public IActionResult Add(RoomCreationViewModel roomCreationData)
        {
            if (!ModelState.IsValid || roomCreationData.Image.RawFormat != ImageFormat.Jpeg)
                return Ok();

            var room = _mapper.Map<Room>(roomCreationData);
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
    }
}
