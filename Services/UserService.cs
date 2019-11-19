using AutoMapper;
using Repository;
using Services.Models;
using Repository.Entities;

namespace Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public User CreateUser(User candidateUser)
        {
            var userEntity = _mapper.Map<UserEntity>(candidateUser);
            var createdUserEntity = _userRepository.CreateUser(userEntity);
            var createdUserModel = _mapper.Map<User>(createdUserEntity);

            return createdUserModel;
        }
    }
}
