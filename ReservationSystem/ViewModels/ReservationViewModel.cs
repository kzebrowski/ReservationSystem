using System;
using System.ComponentModel.DataAnnotations;

namespace ReservationSystem.ViewModels
{
    public class ReservationViewModel
    {
        [Required]
        public Guid RoomId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
