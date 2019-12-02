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
                "Server=tcp:sql-server-database.database.windows.net,1433;Initial Catalog=ReservationSystemDatabase;Persist Security Info=False;User ID=krzysztof;Password=Lollol12;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>()
                .HasAlternateKey(u => u.Email);
            modelBuilder.Entity<UserEntity>()
                .HasAlternateKey(u => u.PhoneNumber);
        }

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<RoomEntity> Rooms { get; set; }
    }
}
