using System.Collections.Generic;
using Services.Models;

namespace Services
{
    public interface IRoomsService
    {
        IEnumerable<Room> GetAll();

        Room Add(RoomCreationDTO room);
    }
}
