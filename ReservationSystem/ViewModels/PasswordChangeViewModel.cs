using System;
using System.ComponentModel.DataAnnotations;

namespace ReservationSystem.ViewModels
{
    public class PasswordChangeViewModel
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        public string Code { get; set; }
    }
}
