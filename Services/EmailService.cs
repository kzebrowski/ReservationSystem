using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Services.Models;

namespace Services
{
    public class EmailService: IEmailService
    {
        private readonly ISendGridClient _client;
        private readonly string _hostName;

        public EmailService()
        {
            _hostName = Environment.GetEnvironmentVariable("RESERVATIONSYSTEM_HOSTNAME");
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
            _client = new SendGridClient(apiKey);
        }

        public async Task SendActivationCode(string email, string code)
        {
            var activationLink = _hostName + "activate/" + email.Replace("@", "%40") + "/" + code;
            var message = new SendGridMessage
            {
                From = new EmailAddress("notyfikacje@reservationsystem.net", "Reservation System"),
                Subject = "Aktywacja konta",
                HtmlContent = 
                    "<h1>Witaj w ReservationSystem!</h1>" +
                    "<p> Bardzo cieszymy się, że do nas dołączyłeś.</p>" +
                    "<p> Aby w pełni móc korzystać ze swojego konta, musisz najpierw przejść procedurę aktywacji. Aby aktywować swoje konto kliknij proszę w poniższy link:</p>" +
                    $"<a href=\"{activationLink}\">{activationLink}</a>" +
                    "<p> Dziękujemy za wybranie naszego ośrodka i życzymy miłych wakacji.</p>"
            };
            message.AddTo(new EmailAddress(email));

            _client.SendEmailAsync(message);
        }

        public async Task SendReservationPlacedNotification(Reservation reservation)
        {
            var message = new SendGridMessage
            {
                From = new EmailAddress("notyfikacje@reservationsystem.net", "Reservation System"),
                Subject = "Potwierdzenie rezerwacji",
                HtmlContent =
                    "<h1>Dzień dobry!</h1>" +
                    $"<p> Twoja rezeracja na {reservation.Room.Title} w dniach {reservation.StartDate}-{reservation.EndDate} została potwierdzona.</p>" +
                    "<p> Życzymy udanego pobytu.</p>"
            };
            message.AddTo(new EmailAddress(reservation.User.Email));

            _client.SendEmailAsync(message);
        }

        public async Task SendReservationCanceledNotification(Reservation reservation)
        {
            var message = new SendGridMessage
            {
                From = new EmailAddress("notyfikacje@reservationsystem.net", "Reservation System"),
                Subject = "Odwołanie rezerwacji",
                HtmlContent =
                    "<h1>Dzień dobry!</h1>" +
                    $"<p>Twoja rezeracja na {reservation.Room.Title} w dniach {reservation.StartDate}-{reservation.EndDate} została anulowana.</p>" +
                    "<p>Pozdrawiamy.</p>"
            };
            message.AddTo(new EmailAddress(reservation.User.Email));

            _client.SendEmailAsync(message);
        }

        public void SendPasswordResetMessage(string userEmail, Guid userId, string code)
        {
            var activationLink = _hostName + "resetPassword/" + userId + "/" + code; 
            var message = new SendGridMessage
            {
                From = new EmailAddress("notyfikacje@reservationsystem.net", "Reservation System"),
                Subject = "Resetowanie hasła",
                HtmlContent =
                    "<h1>Dzień dobry!</h1>" +
                    $"<p>Otrzymaliśmy prośbę o zmianę hasła dla profilu <b>{userEmail}</b>. Aby ustawić nowe hasło, prosimy o kliknięcie w poniższy link:</p>" +
                    $"<a href=\"{activationLink}\">{activationLink}</a>" +
                    "<p> Pozdrawiamy.</p>"
            };
            message.AddTo(new EmailAddress(userEmail));

            _client.SendEmailAsync(message);
        }
    }
}
