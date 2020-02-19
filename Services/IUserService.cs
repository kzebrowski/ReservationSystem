using Services.Models;

namespace Services
{
    public interface IUserService
    {
        User CreateUser(User candidateUser);

        bool CheckEmailExits(string email);

        bool CheckPhoneNumberTaken(string number);

        User GetByEmail(string email);

        void Activate(string email);
    }
}
