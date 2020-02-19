using System;

namespace Services.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string Email { get; set; }
        
        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string Token { get; set; }

        public bool IsActivated { get; set; }
    }
}
