using AutoMapper;
using Repository.Entities;
using Services.Models;

namespace Services
{
    public class ServicesMapperConfigurator
    {
        public static void RegisterMappings(IMapperConfigurationExpression mapperConfigurationExpression)
        {
            mapperConfigurationExpression.CreateMap<UserEntity, User>(MemberList.Source).ReverseMap();
        }
    }
}
