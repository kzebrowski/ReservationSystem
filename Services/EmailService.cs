using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

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
            var activationLink = _hostName + email.Replace("@", "%40") + "/" + code;
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
    }
}
