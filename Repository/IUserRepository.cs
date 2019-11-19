using Repository.Entities;

namespace Repository
{
    public interface IUserRepository
    {
        UserEntity CreateUser(UserEntity userEntity);
    }
}
