using System;
using System.Collections.Generic;
using Repository.Entities;

namespace Repository
{
    public interface IRoomRepository
    {
        IEnumerable<RoomEntity> GetAll();

        RoomEntity Add(RoomEntity room);

        RoomEntity GetRoom(Guid roomId);
        
        void Delete(RoomEntity room);
    }
}
