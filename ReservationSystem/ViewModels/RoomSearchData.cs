using System;

namespace ReservationSystem.ViewModels
{
    public class RoomSearchData
    {
        public DateTime StayStart { get; set; }

        public DateTime StayEnd { get; set; }

        public int Guests { get; set; }
    }
}
