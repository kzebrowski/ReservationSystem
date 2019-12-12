using System;
using System.Collections.Generic;
using Services.Models;

namespace Services
{
    public interface IRoomsService
    {
        Room GetRoom(Guid roomId);

        IEnumerable<Room> GetAll();

        Room Add(RoomCreationDTO room);

        void Delete(Room room);
    }
}
