using System;
using System.Collections.Generic;
using Repository.Common;
using Repository.Entities;

namespace Repository
{
    public interface IReservationRepository
    {
        IEnumerable<ReservationEntity> GetAll();

        ReservationEntity Create(ReservationEntity reservationEntity);

        ReservationEntity Get(Guid reservationId);

        IEnumerable<ReservationEntity> GetAllByEmail(string email);

        ReservationEntity UpdateStatus(Guid reservationId, ReservationStatus status);

        IEnumerable<ReservationEntity> GetAllByPhoneNumber(string phoneNumber);

        ReservationEntity Cancel(Guid id);

        IEnumerable<ReservationEntity> GetAllForDate(DateTime date);
    }
}
