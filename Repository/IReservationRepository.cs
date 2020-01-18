using System;
using System.Collections.Generic;
using Repository.Entities;

namespace Repository
{
    public interface IReservationRepository
    {
        IEnumerable<ReservationEntity> GetAll();

        ReservationEntity Create(ReservationEntity reservationEntity);

        ReservationEntity Get(Guid reservationId);

        IEnumerable<ReservationEntity> GetAllByEmail(string email);

        IEnumerable<ReservationEntity> GetAllByPhoneNumber(string phoneNumber);
    }
}
