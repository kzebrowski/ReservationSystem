using Moq;
using Repository;
using Repository.Entities;
using Services;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using AutoMapper.Configuration;
using Services.Models;
using Xunit;

namespace Tests.Services
{
    public class UserAuthenticationServiceTest
    {
        private readonly IMapper _mapper;

        public UserAuthenticationServiceTest()
        {
            var mapperConfiguration = new MapperConfigurationExpression();
            mapperConfiguration.CreateMap<UserEntity, User>();
            _mapper = new MapperConfiguration(mapperConfiguration).CreateMapper();
        }

        [Fact]
        public void AuthenticateUser_WrongCredentialsPassed_ReturnsNull()
        {
            var email = "donald@duck.dk";
            var password = "Test!234";
            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(x => x.GetUserByCredentials(It.IsAny<string>(), It.IsAny<string>())).Returns((UserEntity)null);
            var authenticationService = new UserAuthenticationService(userRepositoryMock.Object, _mapper);

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
            var authenticationService = new UserAuthenticationService(userRepositoryMock.Object, _mapper);

            var result = authenticationService.AuthenticateUser(email, password);

            Assert.NotNull(result);
            Assert.IsType<User>(result);
            Assert.NotNull(result.Token);
        }
    }
}
