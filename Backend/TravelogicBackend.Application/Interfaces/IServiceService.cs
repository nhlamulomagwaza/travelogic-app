namespace TravelogicBackend.Application.Interfaces;

using TravelogicBackend.Application.DTOs;

public interface IServiceService
{
    Task<IEnumerable<ServiceDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ServiceDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ServiceDto> CreateAsync(CreateServiceDto dto);
    Task<bool> UpdateAsync(int id, UpdateServiceDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}