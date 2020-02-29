// This function is used by Azure Functions service to send notifications about upcomming reservations

#r "../bin/Repository.dll"

using Repository;
using Repository.Entities;
using SendGrid;
using SendGrid.Helpers.Mail;

public static void Run(TimerInfo myTimer, ILogger log)
{
    var apiKey = Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
    var emailClient = new SendGridClient(apiKey);
    var context = new ReservationSystemContext();
    var reservationRepository = new ReservationRepository(context);

    var reservations = reservationRepository.GetAllForDate(DateTime.Now.AddDays(1)).ToList();    

    foreach (var reservation in reservations)
    {
        SendUpcomingReservationNotification(reservation);
    }

    void SendUpcomingReservationNotification(ReservationEntity reservation)
    {
        var message = new SendGridMessage
        {
            From = new EmailAddress("notyfikacje@reservationsystem.net", "Reservation System"),
            Subject = "Nadchodząca rezerwacja",
            HtmlContent =
                "<h1>Dzień dobry!</h1>" +
                $"<p>Uprzejmie przyponiamy o rezerawcji na {reservation.Room.Title} w dniu {reservation.StartDate}. Przypominamy, że rezerwację można zrealizować od godziny 10:00.</p>" +
                "<p> Pozdrawiamy.</p>"
        };
        message.AddTo(new EmailAddress(reservation.User.Email));

        emailClient.SendEmailAsync(message);
    }
}
