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
            mapperConfigurationExpression.CreateMap<RoomEntity, Room>().ReverseMap();
            mapperConfigurationExpression.CreateMap<RoomCreationDto, RoomEntity>()
                .ForMember(x => x.ImageUrl, opt => opt.Ignore());
            mapperConfigurationExpression.CreateMap<RoomUpdateDto, RoomEntity>()
                .ForMember(x => x.ImageUrl, opt => opt.Ignore());
        }
  }
}
