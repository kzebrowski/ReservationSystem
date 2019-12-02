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

            mapperConfigurationExpression.CreateMap<RoomEntity, RoomModel>()
                .ForMember(x => x.Image, opt => opt.MapFrom<ByteArrayToImageResolver>());
        }

        internal class ByteArrayToImageResolver : IValueResolver<RoomEntity, object, Image>
        {
            public Image Resolve(RoomEntity source, object dest, Image member, ResolutionContext context)
            {
                var ms = new MemoryStream(source.Image);
                return Image.FromStream(ms);
            }
        }
    }
}
