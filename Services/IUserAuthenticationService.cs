using Services.Models;

namespace Services.Common
{
    public interface IUserAuthenticationService
    {
        User AuthenticateUser(string email, string password);
    }
}
