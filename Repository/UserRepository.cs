using Repository.Entities;

namespace Repository
{
    public class UserRepository: IUserRepository
    {
        private ReservationSystemContext _context;

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
    }
}
