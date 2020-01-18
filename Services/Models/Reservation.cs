using System;
using Repository.Entities;
using Services.Common;

namespace Services.Models
{
    public class Reservation
    {
        public Guid Id { get; set; }

        public Guid RoomId { get; set; }

        public RoomEntity Room { get; set; }

        public Guid UserId { get; set; }

        public UserEntity User { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Price { get; set; }

        public ReservationStatus Status { get; set; }
    }
}
