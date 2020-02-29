using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Repository.Common;
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
            _context.SaveChanges();

            return reservationEntity;
        }

        public ReservationEntity Get(Guid reservationId)
        {
            return _context.Reservations
                .Include(x => x.Room)
                .Include(x => x.User)
                .SingleOrDefault(x => x.Id == reservationId);
        }

        public IEnumerable<ReservationEntity> GetAllByEmail(string email)
        {
            return _context.Reservations
                .Include(x => x.Room)
                .Include(x => x.User)
                .Where(x => x.User.Email == email);
        }

        public ReservationEntity UpdateStatus(Guid reservationId, ReservationStatus status)
        {
            var reservation = _context.Reservations.SingleOrDefault(x => x.Id == reservationId);

            if (reservation != null)
            {
                reservation.Status = status;
                _context.SaveChanges();
            }

            return reservation;
        }

        public IEnumerable<ReservationEntity> GetAllByPhoneNumber(string phoneNumber)
        {
            return _context.Reservations
                .Include(x => x.Room)
                .Include(x => x.User)
                .Where(x => x.User.PhoneNumber == phoneNumber);
        }

        public ReservationEntity Cancel(Guid id)
        {
            var reservation = Get(id);
            
            if (reservation != null)
            {
                reservation.Status = ReservationStatus.Canceled;
                _context.SaveChanges();
                return reservation;
            }

            return null;
        }
        
        // This function will be used only by an external tool, to send upcoming reservation notification
        public IEnumerable<ReservationEntity> GetAllForDate(DateTime date)
        {
            return _context.Reservations
                .Include(x => x.Room)
                .Include(x => x.User)
                .Where(x => x.StartDate.Date == date.Date);
        }
    }
}
