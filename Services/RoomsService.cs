using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Repository;
using Repository.Entities;
using Services.Models;

namespace Services
{
    public class RoomsService : IRoomsService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;

        public RoomsService(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }

        public IEnumerable<Room> GetAll()
        {
            var roomEntities = _roomRepository.GetAll();

            return _mapper.Map<IEnumerable<Room>>(roomEntities);
        }

        public Room Add(RoomCreationDTO room)
        {
            var uploadResult = UploadImageToCloudinary(room.Image);
            var roomEntity = _mapper.Map<RoomEntity>(room);
            roomEntity.ImageUrl = uploadResult.JsonObj["url"].ToString();

            var createdRoom = _roomRepository.Add(roomEntity);

            return _mapper.Map<Room>(createdRoom);
        }

        private static ImageUploadResult UploadImageToCloudinary(Image image)
        {
            //TODO: move string to environment variable
            var filePath = ".\\roomImage.jpg";
            var cloudinary = new Cloudinary("cloudinary://631697151674597:47xBl3jAKoqvKgDeP5jdcM7I7L0@dwcl9sgyd");

            var bmp = new Bitmap(image);
            bmp.Save(filePath, ImageFormat.Jpeg);
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(filePath)
            };
            
            var uploadResult = cloudinary.Upload(uploadParams);
            File.Delete(filePath);

            return uploadResult;
        }
    }
}
