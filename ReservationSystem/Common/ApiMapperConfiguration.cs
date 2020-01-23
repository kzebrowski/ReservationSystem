using AutoMapper;
using ReservationSystem.ViewModels;
using Services.Common;
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
            mapperConfigurationExpression.CreateMap<ReservationCreationViewModel, ReservationCreationDto>();
            mapperConfigurationExpression.CreateMap<Reservation, ReservationViewModel>()
                .ForMember(x => x.RoomName, opt => opt.MapFrom(s => s.Room.Title));
            mapperConfigurationExpression.CreateMap<Reservation, ReservationViewModel>()
                .ForMember(x => x.RoomName, opt => opt.MapFrom(s => s.Room.Title))
                .ForMember(x => x.UserData, opt => opt.MapFrom(s => s.User))
                .ForMember(x => x.Status, opt => opt.MapFrom(s => s.Status.ToFriendlyString()));
        }
    }
}
