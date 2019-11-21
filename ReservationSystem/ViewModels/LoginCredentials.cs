using System.ComponentModel.DataAnnotations;

namespace ReservationSystem.ViewModels
{
    public class LoginCredentials
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}