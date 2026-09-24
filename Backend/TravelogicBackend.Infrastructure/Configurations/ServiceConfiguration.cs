using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TravelogicBackend.Domain.Entities;

namespace TravelogicBackend.Infrastructure.Data.Configurations
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.ToTable("services");//snake casing table name

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Title)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(s => s.Description)
                .HasMaxLength(500);

            // A supplier has many services, and a service has one supplier
            builder.HasOne(s => s.Supplier)
                .WithMany(sup => sup.Services)
                .HasForeignKey(s => s.SupplierId)
                .OnDelete(DeleteBehavior.Cascade);

            //I'm making the title of the service the index for the service table
            builder.HasIndex(s => s.Title);
        }
    }
}