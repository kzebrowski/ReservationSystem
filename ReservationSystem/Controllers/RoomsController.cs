using System;
using System.Globalization;
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

        public RoomsController(IRoomsService roomsService)
        {
            _roomsService = roomsService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var rooms = _roomsService.GetAll();

            return Ok(rooms);
        }

        public IActionResult Add(RoomCreationViewModel candidateRoom)
        {
            return Ok();
        }

        public IActionResult Edit(RoomModel candidateRoom)
        {
            return Ok();
        }

        public IActionResult Delete(Guid roomId)
        {
            return Ok();
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery]RoomSearchData roomSearchData)
        {
            var provider =  new CultureInfo("pl-PL");
            var stayStart = DateTime.ParseExact(roomSearchData.StayStart, "dd-MM-yyyy", provider);
            var stayEnd = DateTime.ParseExact(roomSearchData.StayEnd, "dd-MM-yyyy", provider);
            return Ok();
        }
    }
}
