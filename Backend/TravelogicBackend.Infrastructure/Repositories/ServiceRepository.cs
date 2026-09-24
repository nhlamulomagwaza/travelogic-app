using Microsoft.EntityFrameworkCore;
using Travelogic.Application.Interfaces;
using TravelogicBackend.Domain.Entities;
using TravelogicBackend.Infrastructure.Data;

namespace TravelogicBackend.Infrastructure.Repositories;

public class ServiceRepository: IRepository<Service>
{
    private readonly AppDbContext _context;

    public ServiceRepository(AppDbContext context)
    {
        _context = context;
    }
        
    public async Task<Service?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Services
            .Include(s => s.Supplier) //Supplier of the service, every service has a supplier
                                           //and every supplier has a service.
 .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Service>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Services
            .Include(s => s.Supplier)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Service service)
    {
        await _context.Services.AddAsync(service);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Service service)
    {
        _context.Services.Update(service);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var service = await GetByIdAsync(id, cancellationToken);
        if (service != null)
        {
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
        }
    }
}