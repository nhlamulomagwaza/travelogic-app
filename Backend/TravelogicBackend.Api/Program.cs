using Microsoft.EntityFrameworkCore;
using TravelogicBackend.API.Middleware;
using TravelogicBackend.Application.Mappings;
using TravelogicBackend.Infrastructure.Data;
using TravelogicBackend.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddOpenApi();

//Hi Travelogic, here i'm adding cors for my vite client, so that 
//the frontend can communicate with the backend without any issues
builder.Services.AddCors(options =>
{
    options.AddPolicy("react-client", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var builderApp = builder.Build();

// Database migration & seeding with retry logic for Docker containers
using (var scope = builderApp.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();

    int maxRetries = 5;
    for (int attempt = 1; attempt <= maxRetries; attempt++)
    {
        try
        {
            var db = services.GetRequiredService<AppDbContext>();

            await db.Database.MigrateAsync();
            await DataSeeder.SeedAsync(db, logger);

            logger.LogInformation("Database migration and seeding completed successfully.");
            break;
        }
        catch (Exception ex)
        {
            if (attempt == maxRetries)
            {
                logger.LogError(ex, "Fatal: Database migration and seeding failed after {MaxRetries} attempts.", maxRetries);
                throw;
            }

            logger.LogWarning(ex, "Database not ready yet (Attempt {Attempt}/{MaxRetries}). Retrying in 5 seconds...", attempt, maxRetries);
            await Task.Delay(TimeSpan.FromSeconds(5));
        }
    }
}

builderApp.UseExceptionHandler();

if (builderApp.Environment.IsDevelopment())
{
    builderApp.MapOpenApi();pp
}

builderApp.UseHttpsRedirection();
builderApp.UseCors("react-client");
builderApp.MapControllers();
builderApp.Run();