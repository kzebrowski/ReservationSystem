using Repository.Entities;

namespace Repository
{
    public interface IUserRepository
    {
        UserEntity CreateUser(UserEntity userEntity);

        UserEntity GetUserByEmail(string email);

        UserEntity GetUserByPhoneNumber(string phoneNumber);

        UserEntity GetUserByCredentials(string email, string password);

        void Activate(string email);
    }
}
