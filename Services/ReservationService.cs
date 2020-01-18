using System;
using System.Collections.Generic;
using AutoMapper;
using Repository;
using Repository.Entities;
using Services.Models;
using Services.Common;

namespace Services
{
    public class ReservationService : IReservationService
    {
        private readonly IMapper _mapper;
        private readonly IReservationRepository _reservationService;
        private readonly IRoomsService _roomsService;

        public ReservationService(IMapper mapper, IReservationRepository reservationService, IRoomsService roomsService)
        {
            _mapper = mapper;
            _reservationService = reservationService;
            _roomsService = roomsService;
        }

        public IEnumerable<Reservation> GetAll()
        {
            var reservationEntities = _reservationService.GetAll();

            return _mapper.Map<IEnumerable<Reservation>>(reservationEntities);
        }

        public Reservation Create(ReservationCreationDto reservationCreationDto)
        {
            var room = _roomsService.GetRoom(reservationCreationDto.RoomId);
            var price = room.Price * (int)(reservationCreationDto.EndDate - reservationCreationDto.StartDate).TotalDays;

            var reservation = new Reservation
            {
                RoomId = reservationCreationDto.RoomId,
                UserId = reservationCreationDto.UserId,
                StartDate = reservationCreationDto.StartDate,
                EndDate = reservationCreationDto.EndDate,
                Status = ReservationStatus.Pending,
                Price = price
            };

            var reservationEntity = _mapper.Map<ReservationEntity>(reservation);
            var createdReservation = _reservationService.Create(reservationEntity);

            return _mapper.Map<Reservation>(createdReservation);
        }

        public Reservation Get(Guid reservationId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Reservation> GetAllByEmail(string email)
        {
            var reservationEntities = _reservationService.GetAllByEmail(email);

            return _mapper.Map<IEnumerable<Reservation>>(reservationEntities);
        }

        public IEnumerable<Reservation> GetAllByPhoneNumber(string phoneNumber)
        {
            var reservationEntities = _reservationService.GetAllByPhoneNumber(phoneNumber);

            return _mapper.Map<IEnumerable<Reservation>>(reservationEntities);
        }
    }
}
