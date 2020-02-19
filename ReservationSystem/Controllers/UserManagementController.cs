﻿using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Common;
using ReservationSystem.ViewModels;
using Services;
using Services.Models;
using System.Collections.Generic;
using AutoMapper;

namespace ReservationSystem.Controllers
{
    [Route("api/user")]
    public class UserManagementController: ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IActivationCodeService _activationCodeService;
        private readonly IEmailService _emailService;

        public UserManagementController(IUserService userService, IMapper mapper, IActivationCodeService activationCodeService, IEmailService emailService)
        {
            _userService = userService;
            _mapper = mapper;
            _activationCodeService = activationCodeService;
            _emailService = emailService;
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserCreationViewModel candidateUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values);

            var validationErrors = new List<ValidationError>();

            if (_userService.CheckEmailExits(candidateUser.Email))
                validationErrors.Add(new ValidationError { Field = "Email", Message = "Podany email jest już zajęty" });
            if (_userService.CheckPhoneNumberTaken(candidateUser.PhoneNumber))
                validationErrors.Add(new ValidationError { Field = "PhoneNumber", Message = "Podany numer telefonu jest już zajęty" });
            if (validationErrors.Count != 0)
                return Ok(validationErrors);

            var user = _mapper.Map<User>(candidateUser);
            var result = _userService.CreateUser(user);

            return Ok(result);
        }

        [HttpGet("[action]/{email}/{code}")]
        public IActionResult Activate(string email, string code)
        {
            if (!_userService.CheckEmailExits(email))
                return BadRequest("Email nie istnieje");

            if (_activationCodeService.Validate(code, email))
                return Ok();

            var newCode = _activationCodeService.CreateNew(email);
            _emailService.SendActivationCode(email, newCode);
            return BadRequest();
        }
    }
}
