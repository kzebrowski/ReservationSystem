using System.Collections.Generic;
using Repository.Entities;

namespace Repository
{
    public interface IRoomRepository
    {
        IEnumerable<RoomEntity> GetAll();

        RoomEntity Add(RoomEntity room);
    }
}
