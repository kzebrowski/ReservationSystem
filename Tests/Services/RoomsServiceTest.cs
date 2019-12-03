using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using AutoMapper;
using Moq;
using Repository;
using Repository.Entities;
using Services;
using Services.Models;
using Xunit;

namespace Tests.Services
{
    public class RoomsServiceTest
    {
        private readonly IMapper _mapper;

        public RoomsServiceTest()
        {
            _mapper = new MapperConfiguration(cfg =>
            {
                ServicesMapperConfigurator.RegisterMappings(cfg);
            }).CreateMapper();
        }

        [Fact]
        public void GetAll_PropperDataGiven_ShouldReturnPropperlyMappedRoomColleciton()
        {
            Guid[] ids = { Guid.NewGuid(), Guid.NewGuid() };
            var image = Image.FromFile("./C_Sharp_logo.jpeg");
            var byteArrayImage = ConvertImageToByteArray(image);
            IEnumerable <RoomEntity> roomEntities = new[]
            {
                new RoomEntity
                {
                    Id = ids[0],
                    Capacity = 4,
                    Title = "TestRoom1",
                    Description = "very good",
                    Price = 250,
                    Image = byteArrayImage
                },
                new RoomEntity
                {
                    Id = ids[1],
                    Capacity = 2,
                    Title = "TestRoom2",
                    Description = "really good",
                    Price = 200,
                    Image = byteArrayImage
                }
            };
            var roomRepositoryMock = new Mock<IRoomRepository>();
            roomRepositoryMock.Setup(x => x.GetAll()).Returns(roomEntities);
            var roomsService = new RoomsService(roomRepositoryMock.Object, _mapper);

            var rooms = roomsService.GetAll();

            Assert.Equal(2, rooms.Count());
            Assert.Equal(image.Width, rooms.First().Image.Width);
            Assert.Equal(image.Height, rooms.First().Image.Height);
            Assert.Contains(rooms.First().Id, ids);
        }

        public void Add_PropperDataGiven_ShouldReturnPropperlyMappedRoom()
        {
            var image = Image.FromFile("./C_Sharp_logo.jpeg");
            var byteArrayImage = ConvertImageToByteArray(image);
            var roomEntity =
                new RoomEntity
                {
                    Capacity = 4,
                    Title = "TestRoom1",
                    Description = "very good",
                    Price = 250,
                    Image = byteArrayImage
                };
            var roomRepositoryMock = new Mock<IRoomRepository>();
            roomRepositoryMock.Setup(x => x.Add(It.IsAny<RoomEntity>())).Returns(roomEntity);
            var roomsService = new RoomsService(roomRepositoryMock.Object, _mapper);

            var result = roomsService.Add(new Room());

            Assert.Equal(image.Width, result.Image.Width);
            Assert.Equal(image.Height, result.Image.Height);
            Assert.Equal(result.Title, roomEntity.Title);
        }

            private static byte[] ConvertImageToByteArray(Image imageIn)
        {
            var ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            return ms.ToArray();
        }

        private static Image ConvertByteArrayToImage(byte[] byteArrayIn)
        {
            var ms = new MemoryStream(byteArrayIn);
            return Image.FromStream(ms);
        }
    }
}
