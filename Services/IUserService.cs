using System;
using System.Collections.Generic;
using Services.Models;

namespace Services
{
    public interface IUserService
    {
        User Get(Guid userId);

        IEnumerable<User> GetAll();

        User CreateUser(User candidateUser);

        bool CheckEmailExits(string email);

        bool CheckPhoneNumberTaken(string number);

        User GetByEmail(string email);

        void Activate(string email);

        User ChangePassword(Guid userId, string newPassword);

        void DeleteUser(Guid userId);
    }
}
