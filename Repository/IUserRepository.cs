using System;
using Repository.Entities;

namespace Repository
{
    public interface IUserRepository
    {
        UserEntity Get(Guid userId);

        UserEntity CreateUser(UserEntity userEntity);

        UserEntity GetUserByEmail(string email);

        UserEntity GetUserByPhoneNumber(string phoneNumber);

        UserEntity GetUserByCredentials(string email, string password);

        void Activate(string email);

        UserEntity ChangePassword(Guid userId, string newPassword);
    }
}
