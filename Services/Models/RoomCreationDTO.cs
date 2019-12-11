using System.Drawing;

namespace Services.Models
{
    public class RoomCreationDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int Capacity { get; set; }

        public int Price { get; set; }

        public Image Image { get; set; }
    }
}
