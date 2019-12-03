using System.Collections.Generic;
using AutoMapper;
using Repository;
using Repository.Entities;
using Services.Models;

namespace Services
{
    public class RoomsService : IRoomsService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;

        public RoomsService(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }

        public IEnumerable<Room> GetAll()
        {
            var roomEntities = _roomRepository.GetAll();

            return _mapper.Map<IEnumerable<Room>>(roomEntities);
        }

        public Room Add(Room room)
        {
            var roomEntity = _mapper.Map<RoomEntity>(room);
            var createdRoom = _roomRepository.Add(roomEntity);

            return _mapper.Map<Room>(createdRoom);
        }
    }
}
