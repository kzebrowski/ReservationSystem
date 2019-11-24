using Services.Models;

namespace Services
{
    public interface IUserAuthenticationService
    {
        User AuthenticateUser(string email, string password);
    }
}
