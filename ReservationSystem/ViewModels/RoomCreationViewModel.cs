using System.Drawing;

namespace ReservationSystem.ViewModels
{
    public class RoomCreationViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int Capacity { get; set; }

        public int Price { get; set; }

        public Image Image { get; set; }
    }
}
