using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.NetworkInformation;
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
        private readonly Cloudinary _cloudinary;

        public RoomsService(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
            _cloudinary = new Cloudinary("cloudinary://631697151674597:47xBl3jAKoqvKgDeP5jdcM7I7L0@dwcl9sgyd");
        }

        public Room GetRoom(Guid roomId)
        {
            var roomEntity = _roomRepository.GetRoom(roomId);
            var room =_mapper.Map<Room>(roomEntity);

            return room;
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

        public void Delete(Room room)
        {
            var roomEntity = _mapper.Map<RoomEntity>(room);
            var imageId = GetResourceIdFromUrl(roomEntity.ImageUrl);

            _roomRepository.Delete(roomEntity);
            _cloudinary.DeleteResources(imageId);
        }

        private ImageUploadResult UploadImageToCloudinary(Image image)
        {
            //TODO: move string to environment variable
            var filePath = ".\\roomImage.jpg";

            var bmp = new Bitmap(image);
            bmp.Save(filePath, ImageFormat.Jpeg);
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(filePath)
            };
            
            var uploadResult = _cloudinary.Upload(uploadParams);
            File.Delete(filePath);

            return uploadResult;
        }

        private string GetResourceIdFromUrl(string url)
        {
            return url.Split('/').Last().Split('.').First();
        }
    }
}
