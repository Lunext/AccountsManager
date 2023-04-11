
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Security.Principal;

namespace Persistence
{
    public partial class ApplicationDbContext : DbContext
    {


        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public ApplicationDbContext()
        {
            
        }
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-4A9TF99;Database=AccountsManagerDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            OnModelCreatingPartial(modelBuilder);

        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);








    }
}
