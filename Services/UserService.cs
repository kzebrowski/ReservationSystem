using AutoMapper;
using Repository;
using Repository.Entities;
using Services.Models;

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

        public bool CheckEmailExits(string email)
        {
            var user = _userRepository.GetUserByEmail(email);

            return user != null;
        }

        public User GetByEmail(string email)
        {
            var userEntity = _userRepository.GetUserByEmail(email);

            return _mapper.Map<User>(userEntity);
        }

        public bool CheckPhoneNumberTaken(string number)
        {
            var user = _userRepository.GetUserByPhoneNumber(number);

            return user != null;
        }
    }
}
