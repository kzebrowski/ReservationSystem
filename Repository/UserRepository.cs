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
    }
}
