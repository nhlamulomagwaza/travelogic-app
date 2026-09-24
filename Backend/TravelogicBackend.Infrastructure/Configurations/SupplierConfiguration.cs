using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TravelogicBackend.Domain.Entities;
using TravelogicBackend.Domain.Enums;

namespace TravelogicBackend.Infrastructure.Data.Configurations
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.ToTable("suppliers"); // here i'm implementing my own custom snake casing table name

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(s => s.Address)
                .HasMaxLength(250);

            builder.Property(s => s.Website)
                .HasMaxLength(200);

            builder.Property(s => s.PhoneNumber)
                .HasMaxLength(50);

            builder.Property(s => s.Country)
                .HasDefaultValue(Country.SouthAfrica)
                .HasSentinel(Country.SouthAfrica);

            //INDEXES
            //I'm making the name of the supplier the index for the supplier table
            builder.HasIndex(s => s.Name);
        }
    }
}