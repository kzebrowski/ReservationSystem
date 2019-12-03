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
        }
    }
}
