using System;

namespace ReservationSystem.ViewModels
{
    public class PasswordChangeViewModel
    {
        public Guid userId { get; set; }

        public string Password { get; set; }

        public string Code { get; set; }
    }
}
