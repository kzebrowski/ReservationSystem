using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.ViewModels;
using Services;
using Services.Models;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public ReservationsController(IReservationService reservationService, IMapper mapper, IUserService userService)
        {
            _reservationService = reservationService;
            _mapper = mapper;
            _userService = userService;
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult Create([FromBody]ReservationCreationViewModel reservationViewModel)
        {
            if (!ModelState.IsValid)
                return Ok();

            var reservationCreationDto = _mapper.Map<ReservationCreationDto>(reservationViewModel);
            var createdReservation = _reservationService.Create(reservationCreationDto);

            return Ok(createdReservation);
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult Cancel([FromBody]Guid id)
        {
            if (id == Guid.Empty)
                return Ok();

            var canceledReservation = _reservationService.Cancel(id);

            return Ok(canceledReservation);
        }

        [Authorize]
        [HttpGet("getbyemail/{email}")]
        public IActionResult GetReservationsByEmail(string email)
        {
            if (!_userService.CheckEmailExits(email))
                return Ok();

            var reservations = _reservationService.GetAllByEmail(email).OrderBy(x => x.Status).ThenBy(x => x.StartDate);

            var reservationViewModels = _mapper.Map<IEnumerable<ReservationViewModel>>(reservations);

            return Ok(reservationViewModels);
        }
    }
}
