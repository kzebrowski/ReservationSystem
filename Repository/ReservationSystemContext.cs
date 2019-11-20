using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository
{
    public class ReservationSystemContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(
                "Server=DESKTOP-NGKN0GN\\SQLEXPRESS;Database=ReservationSystemDatabase;Trusted_Connection=True;");
        }

        public DbSet<UserEntity> Users { get; set; }
    }
}
