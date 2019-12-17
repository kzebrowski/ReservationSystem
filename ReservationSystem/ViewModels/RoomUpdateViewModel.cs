using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ReservationSystem.ViewModels
{
    public class RoomUpdateViewModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int Capacity { get; set; }

        [Required]
        public int Price { get; set; }

        public IFormFile Image { get; set; }
    }
}
