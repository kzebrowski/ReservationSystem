using Repository.Entities;

namespace Repository
{
    public class UserRepository: IUserRepository
    {
        public UserEntity CreateUser(UserEntity userEntity)
        {
            return userEntity;
        }
    }
}
