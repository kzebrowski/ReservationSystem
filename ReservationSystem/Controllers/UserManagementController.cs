using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Common;
using ReservationSystem.ViewModels;
using Services;
using Services.Common;
using Services.Models;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Controllers
{
    [Route("api/user")]
    public class UserManagementController: ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IActivationCodeService _activationCodeService;
        private readonly IEmailService _emailService;

        public UserManagementController(IUserService userService, 
            IMapper mapper, 
            IActivationCodeService activationCodeService, 
            IEmailService emailService)
        {
            _userService = userService;
            _mapper = mapper;
            _activationCodeService = activationCodeService;
            _emailService = emailService;
        }

        [Authorize]
        [HttpDelete("[action]")]
        public IActionResult Delete([FromBody]Guid userId)
        {
            var fetchedUser = _userService.Get(userId);
            if (fetchedUser == null)
                return BadRequest();

            _userService.DeleteUser(userId);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody]UserCreationViewModel candidateUser)
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

        [HttpPost("resetPassword")]
        public IActionResult SendPasswordResetLink([FromBody]string email)
        {
            if (!_userService.CheckEmailExits(email))
                return BadRequest();

            var user = _userService.GetByEmail(email);
            var code =_activationCodeService.CreateNew(user.Email);
            _emailService.SendPasswordResetMessage(user.Email, user.Id, code);

            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult ChangePassword([FromBody]PasswordChangeViewModel passwordChangeViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = _userService.Get(passwordChangeViewModel.UserId);

            if (user is null || !_activationCodeService.Validate(passwordChangeViewModel.Code, user.Email))
                return BadRequest();

            _userService.ChangePassword(user.Id, passwordChangeViewModel.Password);
            
            return Ok();
        }

        [HttpGet("[action]/{email}/{code}")]
        public IActionResult Activate(string email, string code)
        {
            if (!_userService.CheckEmailExits(email))
                return BadRequest("Email nie istnieje");

            if (_activationCodeService.Validate(code, email))
            {
                _userService.Activate(email);
                return Ok();
            }

            var newCode = _activationCodeService.CreateNew(email);
            _emailService.SendActivationCode(email, newCode);
            return BadRequest();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("[action]/{email}")]
        public IActionResult GetByEmail(string email)
        {
            if (_userService.CheckEmailExits(email))
                return BadRequest();

            var user = _userService.GetByEmail(email);
            user.Password = "";
            return Ok(user);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("[action]/{userId}")]
        public IActionResult GetById(Guid userId)
        {
            var user = _userService.Get(userId);
            if (user == null)
                return BadRequest();

            user.Password = "";
            return Ok(user);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("[action]")]
        public IActionResult GetAll(Guid userId)
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
