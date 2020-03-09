using System;
using System.Collections.Generic;
using System.Linq;
using Repository.Entities;

namespace Repository
{
    public class UserRepository: IUserRepository
    {
        private readonly ReservationSystemContext _context;

        public UserRepository(ReservationSystemContext context)
        {
            _context = context;
        }

        public UserEntity Get(Guid userId)
        {
            return _context.Users.SingleOrDefault(x => x.Id == userId);
        }

        public UserEntity CreateUser(UserEntity userEntity)
        {
            _context.Add(userEntity);
            _context.SaveChanges();

            return userEntity;
        }

        public UserEntity GetUserByEmail(string email)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email);
        }

        public UserEntity GetUserByPhoneNumber(string phoneNumber)
        {
            return _context.Users.SingleOrDefault(u => u.PhoneNumber == phoneNumber);
        }

        public UserEntity GetUserByCredentials(string email, string password)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email && u.Password == password);
        }

        public void Activate(string email)
        {
            var user = _context.Users.Single(x => x.Email == email);
            user.IsActivated = true;
            _context.SaveChanges();
        }

        public UserEntity ChangePassword(Guid userId, string newPassword)
        {
            var user = _context.Users.Single(x => x.Id == userId);
            user.Password = newPassword;
            _context.SaveChanges();

            return user;
        }

        public void DeleteUser(Guid userId)
        {
            var user = _context.Users.Single(x => x.Id == userId);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public IEnumerable<UserEntity> GetAll()
        {
            return _context.Users.ToList();
        }
    }
}
