using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.ViewModels;
using Services;
using Services.Models;

namespace ReservationSystem.Controllers
{
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IMapper _mapper;

        public ReservationsController(IReservationService reservationService, IMapper mapper)
        {
            _reservationService = reservationService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult Create([FromBody]ReservationViewModel reservationViewModel)
        {
            if (!ModelState.IsValid)
                return Ok();

            var reservationCreationDto = _mapper.Map<ReservationCreationDto>(reservationViewModel);
            var createdReservation = _reservationService.Create(reservationCreationDto);

            return Ok(createdReservation);
        }
    }
}
