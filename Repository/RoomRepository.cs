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
    }
}
