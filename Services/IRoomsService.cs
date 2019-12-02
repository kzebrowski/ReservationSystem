using System.Collections.Generic;
using Services.Models;

namespace Services
{
    public interface IRoomsService
    {
        IEnumerable<RoomModel> GetAll();
    }
}
