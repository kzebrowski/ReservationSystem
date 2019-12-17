using System;

namespace Services.Models
{
    public class ReservationCreationDto
    {
        public Guid RoomId { get; set; }

        public Guid UserId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
