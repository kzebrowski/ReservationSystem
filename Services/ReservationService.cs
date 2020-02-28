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
        private readonly IReservationRepository _reservationRepository;
        private readonly IRoomsService _roomsService;
        private readonly IEmailService _emailService;

        public ReservationService(IMapper mapper, IReservationRepository reservationRepository, IRoomsService roomsService, IEmailService emailService)
        {
            _mapper = mapper;
            _reservationRepository = reservationRepository;
            _roomsService = roomsService;
            _emailService = emailService;
        }

        public IEnumerable<Reservation> GetAll()
        {
            var reservationEntities = _reservationRepository.GetAll();

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
            var createdEntity = _reservationRepository.Create(reservationEntity);
            var createdReservation = _mapper.Map<Reservation>(createdEntity);
            _emailService.SendReservationPlacedNotification(reservation);

            return createdReservation;
        }

        public Reservation Get(Guid reservationId)
        {
            return _mapper.Map<Reservation>(_reservationRepository.Get(reservationId));
        }

        public IEnumerable<Reservation> GetAllByEmail(string email)
        {
            var reservationEntities = _reservationRepository.GetAllByEmail(email);

            return _mapper.Map<IEnumerable<Reservation>>(reservationEntities);
        }

        public IEnumerable<Reservation> GetAllByPhoneNumber(string phoneNumber)
        {
            var reservationEntities = _reservationRepository.GetAllByPhoneNumber(phoneNumber);

            return _mapper.Map<IEnumerable<Reservation>>(reservationEntities);
        }

        public Reservation UpdateStatus(Guid reservationId, ReservationStatus status)
        {
            var reservationEntity = _reservationRepository.UpdateStatus(reservationId, (Repository.Common.ReservationStatus)status);

            var updatedReservation = _mapper.Map<Reservation>(reservationEntity);
            if(updatedReservation.Status == ReservationStatus.Canceled)
                _emailService.SendReservationCanceledNotification(updatedReservation);

            return updatedReservation;
        }

        public Reservation Cancel(Guid id)
        {
            var reservation = Get(id);

            if (reservation == null || reservation.Status != ReservationStatus.Pending)
                return null;

            var reservationEntity = _reservationRepository.Cancel(id);
            
            var updatedReservation = _mapper.Map<Reservation>(reservationEntity);
            _emailService.SendReservationCanceledNotification(updatedReservation);

            return updatedReservation;
        }

        // This method will be used only by an external tool to send reservation notifications
        public IEnumerable<Reservation> GetAllUpcomingReservations()
        {
            var reservationEntities = _reservationRepository.GetAllForDate(DateTime.Now.AddDays(1));

            return _mapper.Map<IEnumerable<Reservation>>(reservationEntities);
        }
    }
}
