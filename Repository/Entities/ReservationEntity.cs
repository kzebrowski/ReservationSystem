﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using Repository.Common;

namespace Repository.Entities
{
    public class ReservationEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("Room")]
        public Guid RoomId { get; set; }

        public RoomEntity Room { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public UserEntity User { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Price { get; set; }

        public ReservationStatus Status { get; set; }
    }
}
