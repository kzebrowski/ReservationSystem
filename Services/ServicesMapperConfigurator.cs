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

            mapperConfigurationExpression.CreateMap<RoomEntity, Room>()
                .ForMember(x => x.Image, opt => opt.MapFrom<ByteArrayToImageResolver>());

            mapperConfigurationExpression.CreateMap<Room, RoomEntity>()
                .ForMember(x => x.Image, opt => opt.MapFrom<ImageToByteArrayResolver>());
        }

        internal class ByteArrayToImageResolver : IValueResolver<RoomEntity, object, Image>
        {
            public Image Resolve(RoomEntity source, object dest, Image member, ResolutionContext context)
            {
                using (var ms = new MemoryStream(source.Image))
                {
                    return Image.FromStream(ms);
                }
            }
        }

        internal class ImageToByteArrayResolver : IValueResolver<Room, object, byte[]>
        {
            public byte[] Resolve(Room source, object dest, byte[] member, ResolutionContext context)
            {
                using (var ms = new MemoryStream())
                {
                    source.Image.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                    return ms.ToArray();
                }
            }
        }
  }
}
