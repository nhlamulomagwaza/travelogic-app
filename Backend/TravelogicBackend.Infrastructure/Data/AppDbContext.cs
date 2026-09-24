using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TravelogicBackend.Domain.Common;
using TravelogicBackend.Domain.Entities;

namespace TravelogicBackend.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Supplier> Suppliers => Set<Supplier>();
        public DbSet<Service> Services => Set<Service>();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Dynamically applies global query filters to all ISoftDeletable entities
            ApplySoftDeleteQueryFilter(modelBuilder);
        }

        public override int SaveChanges()
        {
            HandleAutoTimestamps();
            HandleSoftDeletes();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            HandleAutoTimestamps();
            HandleSoftDeletes();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void HandleAutoTimestamps()
        {
            var entries = ChangeTracker.Entries<ITrackable>();
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Property(p => p.CreatedAt).IsModified = false; // Prevents CreatedAt from being altered during updates
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }
        }

        // Applies a global query filter to all entities that implement ISoftDeletable using expression trees
        private static void ApplySoftDeleteQueryFilter(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(ISoftDeletable).IsAssignableFrom(entityType.ClrType))
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "e");
                    var property = Expression.Property(parameter, nameof(ISoftDeletable.IsDeleted));
                    var compare = Expression.Equal(property, Expression.Constant(false));
                    var lambda = Expression.Lambda(compare, parameter);

                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }
        }

        // Converts standard .Remove() calls into update statements setting IsDeleted = true
        private void HandleSoftDeletes()
        {
            var entries = ChangeTracker.Entries<ISoftDeletable>()
                .Where(e => e.State == EntityState.Deleted);

            foreach (var entry in entries)
            {
                entry.State = EntityState.Modified;
                entry.Entity.IsDeleted = true;
                entry.Entity.DeletedAt = DateTime.UtcNow;
            }
        }
    }
}