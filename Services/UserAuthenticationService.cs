using Microsoft.IdentityModel.Tokens;
using Repository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services
{
    public class UserAuthenticationService : IUserAuthenticationService
    {
        private readonly IUserRepository _userRepository;

        public UserAuthenticationService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public JwtSecurityToken AuthenticateUser(string email, string password)
        {
            var user = _userRepository.GetUserByCredentials(email, password);

            if (user == null)
                return null;

            //TODO: Get data here from settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&"));
            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "localhost:44375",
                audience: "localhost:44375",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signinCredentials
            );

            return tokenOptions;
        }
    }
}
