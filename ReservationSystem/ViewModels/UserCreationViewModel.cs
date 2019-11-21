using System.ComponentModel.DataAnnotations;

namespace ReservationSystem.ViewModels
{
    public class UserCreationViewModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        [RegularExpression("[0-9]{9}")]
        public string PhoneNumber { get; set; }
    }
}
