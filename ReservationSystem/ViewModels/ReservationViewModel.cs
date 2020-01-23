using System;
using Services.Common;
using Services.Models;

namespace ReservationSystem.ViewModels
{
    public class ReservationViewModel
    {
        public Guid Id { get; set; }

        public string RoomName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public User UserData { get; set; }

        public int Price { get; set; }

        public string Status { get; set; }
    }
}
