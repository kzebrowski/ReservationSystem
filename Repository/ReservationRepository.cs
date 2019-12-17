using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private ReservationSystemContext _context;

        public ReservationRepository(ReservationSystemContext context)
        {
            _context = context;
        }

        public IEnumerable<ReservationEntity> GetAll()
        {
            return _context.Reservations
                .Include(x => x.Room)
                .Include(x => x.User);
        }

        public ReservationEntity Create(ReservationEntity reservationEntity)
        {
            _context.Reservations.Add(reservationEntity);

            return reservationEntity;
        }

        public ReservationEntity Get(Guid reservationId)
        {
            return _context.Reservations
                .Include(x => x.Room)
                .Include(x => x.User)
                .SingleOrDefault(x => x.Id == reservationId);
        }
    }
}
