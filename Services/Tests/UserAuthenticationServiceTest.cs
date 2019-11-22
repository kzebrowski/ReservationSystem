using System.IdentityModel.Tokens.Jwt;
using Moq;
using Repository;
using Repository.Entities;
using Xunit;

namespace Services.Tests
{
    public class UserAuthenticationServiceTest
    {
        [Fact]
        public void AuthenticateUser_WrongCredentialsPassed_ReturnsNull()
        {
            var email = "donald@duck.dk";
            var password = "Test!234";
            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(x => x.GetUserByCredentials(It.IsAny<string>(), It.IsAny<string>())).Returns((UserEntity)null);
            var authenticationService = new UserAuthenticationService(userRepositoryMock.Object);

            var result = authenticationService.AuthenticateUser(email, password);

            Assert.Null(result);
        }

        [Fact]
        public void AuthenticateUser_CorrectCredentialsPassed_GeneratesToken()
        {
            var email = "donald@duck.dk";
            var password = "Test!234";
            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(x => x.GetUserByCredentials(It.IsAny<string>(), It.IsAny<string>())).Returns(new UserEntity());
            var authenticationService = new UserAuthenticationService(userRepositoryMock.Object);

            var result = authenticationService.AuthenticateUser(email, password);

            Assert.NotNull(result);
            Assert.IsType<JwtSecurityToken>(result);
        }
    }
}
