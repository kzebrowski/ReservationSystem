﻿using System;
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
        private readonly string _hostName;

        public UserAuthenticationService(IUserRepository userRepository, IMapper mapper)
        {
            _hostName = Environment.GetEnvironmentVariable("RESERVATIONSYSTEM_HOSTNAME");
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
                issuer: _hostName,
                audience: _hostName,
                claims: new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userEntity.Id.ToString()),
                    new Claim(ClaimTypes.Role, userEntity.Role)
                },
                expires: DateTime.Now.AddDays(10),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            var user = _mapper.Map<User>(userEntity);
            user.Token = tokenString;
            user.Password = "";

            return user;
        }
    }
}
