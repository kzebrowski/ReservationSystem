using System.Collections.Generic;
using AutoMapper;
using Repository;
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

        public IEnumerable<RoomModel> GetAll()
        {
            var roomEntities = _roomRepository.GetAll();

            return _mapper.Map<IEnumerable<RoomModel>>(roomEntities);
        }
    }
}
