using AutoMapper;
using Repository;
using Repository.Entities;
using Services.Common;
using Services.Models;
using System;
using System.Collections.Generic;

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
        
        public User Get(Guid userId)
        {
            var userEntity = _userRepository.Get(userId);

            return _mapper.Map<User>(userEntity);
        }

        public IEnumerable<User> GetAll()
        {
            var userEntities = _userRepository.GetAll();
            var users = _mapper.Map<IEnumerable<User>>(userEntities);

            return users;
        }

        public User CreateUser(User candidateUser)
        {
            candidateUser.Role = Role.User;
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

        public void Activate(string email)
        {
            _userRepository.Activate(email);
        }

        public User ChangePassword(Guid userId, string newPassword)
        {
            var userEntity = _userRepository.ChangePassword(userId, newPassword);

            return _mapper.Map<User>(userEntity);
        }

        public void DeleteUser(Guid userId)
        {
            _userRepository.DeleteUser(userId);
        }

        public bool CheckPhoneNumberTaken(string number)
        {
            var user = _userRepository.GetUserByPhoneNumber(number);

            return user != null;
        }
    }
}
