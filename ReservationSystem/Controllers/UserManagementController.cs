using Microsoft.AspNetCore.Mvc;
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
        private IUserService _userService;
        private IMapper _mapper;

        public UserManagementController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserCreationViewModel candidateUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values);

            var validationErrors = new List<ValidationError>();

            if (_userService.CheckEmailExits(candidateUser.Email))
                validationErrors.Add(new ValidationError{ Field = "Email", Message = "Podany email jest już zajęty" });
            if (_userService.CheckPhoneNumberTaken(candidateUser.PhoneNumber))
                validationErrors.Add(new ValidationError { Field = "PhoneNumber", Message = "Podany numer telefonu jest już zajęty" });
            if (validationErrors.Count != 0)
                return BadRequest(validationErrors);

            var user = _mapper.Map<User>(candidateUser);
            var result = _userService.CreateUser(user);

            return Ok(result);
        }
    }
}
