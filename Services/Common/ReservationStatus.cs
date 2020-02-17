using System;

namespace Services.Common
{
    public enum ReservationStatus
    {
        Pending,
        InProgress,
        Closed,
        Canceled
    }

    public static class ReservationStatusExtensions
    {
        public static string ToFriendlyString(this ReservationStatus reservationStatus)
        {
            switch (reservationStatus)
            {
                case ReservationStatus.Pending:
                    return "Oczekujące";
                case ReservationStatus.InProgress:
                    return "W trakcie";
                case ReservationStatus.Closed:
                    return "Zakończone";
                case ReservationStatus.Canceled:
                    return "Anulowane";
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}