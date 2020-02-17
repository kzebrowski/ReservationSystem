using System;
using System.ComponentModel.DataAnnotations;
using Services.Common;

namespace ReservationSystem.ViewModels
{
    public class StatusChangeViewModel
    {
        [Required]
        public Guid ReservationId { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
