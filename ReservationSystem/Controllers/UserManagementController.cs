using Microsoft.AspNetCore.Mvc;
using ReservationSystem.ViewModels;
using Services;
using Services.Models;

namespace ReservationSystem.Controllers
{
    [Route("api/user")]
    public class UserManagementController: ControllerBase
    {
        private IUserService _userService;

        public UserManagementController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserCreationViewModel candidateUser)
        {
            if (candidateUser == null)
                return BadRequest();

            var user = new User
            {
                Email = candidateUser.Email,
                Password = candidateUser.Password,
                PhoneNumber = candidateUser.PhoneNumber
            };

            var result = _userService.CreateUser(user);

            return Ok(result);
        }
    }
}
