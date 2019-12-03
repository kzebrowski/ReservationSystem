using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace ReservationSystem.ViewModels
{
    public class RoomCreationViewModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int Capacity { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public Image Image { get; set; }
    }
}
