using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Services;

namespace ReservationSystem.ViewModels
{
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("[action]")]
        public IActionResult Login([FromBody] LoginCredentials loginCredentials)
        {
            if (loginCredentials == null)
            {
                return Ok();
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&"));

            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "localhost:44375",
                audience: "localhost:44375",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new {Token = tokenString});
        }
        
        [HttpGet("test")]
        [Authorize]
        public IActionResult TestJwt()
        {
            return NoContent();
        }
    }
}