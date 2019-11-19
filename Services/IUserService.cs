using Services.Models;

namespace Services
{
    public interface IUserService
    {
        User CreateUser(User candidateUser);
    }
}
