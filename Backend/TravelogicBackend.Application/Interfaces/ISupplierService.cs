namespace TravelogicBackend.Application.Interfaces;

using TravelogicBackend.Application.DTOs;

public interface ISupplierService
{
    Task<IEnumerable<SupplierDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<SupplierDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<SupplierDto> CreateAsync(CreateSupplierDto dto);
    Task<bool> UpdateAsync(int id, UpdateSupplierDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}