using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Repository.Entities
{
    public class ActivationCodeEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public UserEntity User { get; set; }

        public DateTime TimeCreated { get; set; }

        public string Code { get; set; }
    }
}
