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
                return BadRequest(ModelState.Values);
            if (!_userService.CheckEmailExits(loginCredentials.Email))
                return BadRequest(new ValidationError{Field = "Email", Message = "Nie istnieje u¿ytkownik z podanym adresem email"});

            var tokenOptions =
                _authenticationService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password);

            if (tokenOptions == null)
                return BadRequest(new ValidationError { Field = "Password", Message = "Nieprawid³owe has³o" });

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new {Token = tokenString});
        }
        
        [HttpGet("test")]
        [Authorize]
        public IActionResult TestJwt()
        {
            return NoContent();
        }
    }
}