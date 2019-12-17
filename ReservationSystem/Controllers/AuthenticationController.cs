using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Common;
using Services;
using Services.Common;

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
                return Ok(new ValidationError{Field = "Email", Message = "Nie istnieje u¿ytkownik z podanym adresem email"});

            var user =
                _authenticationService.AuthenticateUser(loginCredentials.Email, loginCredentials.Password);

            if (user == null)
                return BadRequest(new ValidationError { Field = "Password", Message = "Nieprawid³owe has³o" });
            
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