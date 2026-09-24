using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Travelogic.Application.Interfaces;
using TravelogicBackend.Application.Interfaces;
using TravelogicBackend.Application.Services;
using TravelogicBackend.Domain.Entities;
using TravelogicBackend.Infrastructure.Data;
using TravelogicBackend.Infrastructure.Repositories;


namespace TravelogicBackend.Infrastructure.DependencyInjection
{

    //To avoid bloating program.cs with too many service registrations
    //I created this static class to handle the registration of infrastructure services.
    //This keeps the code organized and maintainable.
    //But services outside of the infastructure layer will be registered in program.cs, unfortunately😅
    public static class ServicesConfigurations
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
           

            //Database
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));



            //Repos
            services.AddScoped<IRepository<Supplier>, SupplierRepository>();
            services.AddScoped<IRepository<Service>, ServiceRepository>();

            // Business Services
            services.AddScoped<ISupplierService, SupplierService>();
            services.AddScoped<IServiceService, ServiceService>();


            return services;
        }

    }
}