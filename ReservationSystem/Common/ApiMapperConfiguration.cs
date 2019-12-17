using AutoMapper;
using ReservationSystem.ViewModels;
using Services.Models;

namespace ReservationSystem.Common
{
    public class ApiMapperConfiguration
    {
        public static void RegisterMappings(IMapperConfigurationExpression mapperConfigurationExpression)
        {
            mapperConfigurationExpression.CreateMap<UserCreationViewModel, User>(MemberList.Source);
            mapperConfigurationExpression.CreateMap<RoomCreationViewModel, Room>(MemberList.Source);
            mapperConfigurationExpression.CreateMap<RoomCreationViewModel, RoomCreationDto>()
                .ForMember(x => x.Image, opt => opt.Ignore());
            mapperConfigurationExpression.CreateMap<RoomUpdateViewModel, RoomUpdateDto>()
                .ForMember(x => x.Image, opt => opt.Ignore());
            mapperConfigurationExpression.CreateMap<ReservationViewModel, ReservationCreationDto>();
        }
    }
}
