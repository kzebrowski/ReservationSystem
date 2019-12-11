using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repository.Entities
{
    public class RoomEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Capacity { get; set; }

        public int Price { get; set; }

        public string ImageUrl { get; set; }
    }
}
