using System.IdentityModel.Tokens.Jwt;

namespace Services
{
    public interface IUserAuthenticationService
    {
        JwtSecurityToken AuthenticateUser(string email, string password);
    }
}
