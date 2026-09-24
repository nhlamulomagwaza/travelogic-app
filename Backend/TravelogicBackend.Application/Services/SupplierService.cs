using AutoMapper;
using Travelogic.Application.Interfaces;
using TravelogicBackend.Application.DTOs;
using TravelogicBackend.Application.Interfaces;
using TravelogicBackend.Domain.Entities;

namespace TravelogicBackend.Application.Services;

public class SupplierService : ISupplierService
{
    private readonly IRepository<Supplier> _repository;
    private readonly IMapper _mapper;

    public SupplierService(IRepository<Supplier> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SupplierDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var suppliers = await _repository.GetAllAsync(cancellationToken);
        return _mapper.Map<IEnumerable<SupplierDto>>(suppliers);
    }

    public async Task<SupplierDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var supplier = await _repository.GetByIdAsync(id, cancellationToken);
        return supplier == null ? null : _mapper.Map<SupplierDto>(supplier);
    }

    public async Task<SupplierDto> CreateAsync(CreateSupplierDto dto)
    {
        var supplier = _mapper.Map<Supplier>(dto);
        await _repository.AddAsync(supplier);
        return _mapper.Map<SupplierDto>(supplier);
    }

    public async Task<bool> UpdateAsync(int id, UpdateSupplierDto dto, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(id, cancellationToken);
        if (existing == null) return false;

        _mapper.Map(dto, existing);
        await _repository.UpdateAsync(existing);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(id, cancellationToken);
        if (existing == null) return false;

        await _repository.DeleteAsync(id, cancellationToken);
        return true;
    }
}