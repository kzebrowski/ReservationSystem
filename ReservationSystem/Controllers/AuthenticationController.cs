using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ReservationSystem.Common;
using Services;

namespace ReservationSystem.ViewModels
{
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        public AuthenticationController(IUserAuthenticationService authenticationService, IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] LoginCredentials loginCredentials)
        {
            if (loginCredentials == null || !ModelState.IsValid)
                return Ok(ModelState.Values);
            if (!_userService.CheckEmailExits(loginCredentials.Email))
                return Ok(new ValidationError{Field = "Email", Message = "Nie istnieje użytkownik z podanym adresem email"});

            var user =
                _authenticationService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password);

            if (user == null)
                return BadRequest(new ValidationError { Field = "Password", Message = "Nieprawidłowe hasło" });

            
            return Ok(user);
        }
        
        [HttpGet("test")]
        [Authorize]
        public IActionResult TestJwt()
        {
            return NoContent();
        }
    }
}