using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] LoginCredentials loginCredentials)
        {
            if (loginCredentials == null)
            {
                return Ok();
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&"));

            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "localhost:5000",
                audience: "localhost:5000",
                claims:
                new List<Claim>()
                {
                    new Claim("name", "dupa")
                },
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials:
                signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new {Token = tokenString});
        }
        
        [HttpGet]
        [Route("test")]
        [Authorize]
        public IActionResult TestJwt()
        {
            return Ok("ok");
        }
    }
}