using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly ReservationSystemContext _context;

        public RoomRepository(ReservationSystemContext context)
        {
            _context = context;
        }

        public RoomEntity GetRoom(Guid roomId)
        {
            return _context.Rooms.AsNoTracking().SingleOrDefault(x => x.Id == roomId);
        }

        public IEnumerable<RoomEntity> GetAll()
        {
            return _context.Rooms;
        }

        public RoomEntity Add(RoomEntity room)
        {
            _context.Rooms.Add(room);
            _context.SaveChanges();

            return room;
        }

        public void Delete(RoomEntity room)
        {
            _context.Rooms.Remove(room);
            _context.SaveChanges();
        }

        public RoomEntity Update(RoomEntity room)
        {
            _context.Rooms.Update(room);
            _context.SaveChanges();

            return room;
        }

        public IEnumerable<RoomEntity> GetRooms(int minimalCapacity, DateTime stayStart, DateTime stayEnd)
        {
            return _context.Rooms
                .Include(x => x.Reservations)
                .Where(x => x.Capacity >= minimalCapacity)
                .Where(x => !x.Reservations.Any(r => r.StartDate < stayEnd && stayStart < r.EndDate));
        }
    }
}
