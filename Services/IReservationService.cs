using System;
using System.Collections.Generic;
using Services.Common;
using Services.Models;

namespace Services
{
    public interface IReservationService
    {
        IEnumerable<Reservation> GetAll();

        Reservation Create(ReservationCreationDto reservationCreationDto);

        Reservation Get(Guid reservationId);

        IEnumerable<Reservation> GetAllByEmail(string email);

        IEnumerable<Reservation> GetAllByPhoneNumber(string phoneNumber);

        Reservation UpdateStatus(Guid reservationId, ReservationStatus status);

        Reservation Cancel(Guid id);

        IEnumerable<Reservation> GetAllUpcomingReservations();
    }
}
