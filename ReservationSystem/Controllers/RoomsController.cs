using Microsoft.AspNetCore.Mvc;
using Services;

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

        public IActionResult Add()
        {
            return Ok();
        }

        public IActionResult Edit()
        {
            return Ok();
        }

        public IActionResult Delete()
        {
            return Ok();
        }

        public IActionResult Search()
        {
            return Ok();
        }
    }
}
