using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<RoomEntity> GetAll()
        {
            return _context.Rooms;
        }
    }
}
