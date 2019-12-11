using System.Collections.Generic;
using AutoMapper;
using Repository.Entities;
using Services.Models;
using System.Drawing;
using System.IO;

namespace Services
{
    public class ServicesMapperConfigurator
    {
        public static void RegisterMappings(IMapperConfigurationExpression mapperConfigurationExpression)
        {
            mapperConfigurationExpression.CreateMap<UserEntity, User>(MemberList.Source).ReverseMap();
            mapperConfigurationExpression.CreateMap<RoomEntity, Room>().ReverseMap();
            mapperConfigurationExpression.CreateMap<RoomCreationDTO, RoomEntity>()
                .ForMember(x => x.ImageUrl, opt => opt.Ignore());
        }
  }
}
