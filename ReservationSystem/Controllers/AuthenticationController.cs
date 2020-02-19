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
        private readonly IActivationCodeService _activationCodeService;
        private readonly IEmailService _emailService;

        public AuthenticationController(IUserAuthenticationService authenticationService, IUserService userService, IActivationCodeService activationCodeService, IEmailService emailService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
            _activationCodeService = activationCodeService;
            _emailService = emailService;
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

            if (!user.IsActivated)
            {
                var activationCode = _activationCodeService.CreateNew(user.Email);
                _emailService.SendActivationCode(user.Email, activationCode);
            }

            return Ok(user);
        }
    }
}