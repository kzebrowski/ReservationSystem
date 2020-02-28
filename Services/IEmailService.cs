using System;
using System.Threading.Tasks;
using Services.Models;

namespace Services
{
    public interface IEmailService
    {
        Task SendActivationCode(string email, string code);

        Task SendReservationPlacedNotification(Reservation reservation);

        Task SendReservationCanceledNotification(Reservation reservation);

        void SendPasswordResetMessage(string userEmail, Guid userId, string code);

        void SendUpcomingReservationNotification(Reservation reservation);
    }
}
