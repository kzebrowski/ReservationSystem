using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Repository;
using Services.Common;
using Services.Models;

namespace Services
{
    public class UserAuthenticationService : IUserAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserAuthenticationService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public User AuthenticateUser(string email, string password)
        {
            var userEntity = _userRepository.GetUserByCredentials(email, password);

            if (userEntity == null)
                return null;

            //TODO: Get data here from settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&"));
            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "localhost:44375",
                audience: "localhost:44375",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(600),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            var user = _mapper.Map<User>(userEntity);
            user.Token = tokenString;

            return user;
        }
    }
}
