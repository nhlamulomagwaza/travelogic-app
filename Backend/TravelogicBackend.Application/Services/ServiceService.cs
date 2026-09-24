using AutoMapper;
using Travelogic.Application.Interfaces;
using TravelogicBackend.Application.DTOs;
using TravelogicBackend.Application.Interfaces;
using TravelogicBackend.Domain.Entities;

namespace TravelogicBackend.Application.Services;

public class ServiceService : IServiceService //😅Hi Travel Logic Code reviewer
                                              //don't be confused with the naming here,
                                              //i mean service entity, hence the service for
                                              //the "Service" entity
{
    private readonly IRepository<Service> _repository;
    private readonly IMapper _mapper;

    public ServiceService(IRepository<Service> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ServiceDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var services = await _repository.GetAllAsync(cancellationToken);
        return _mapper.Map<IEnumerable<ServiceDto>>(services);
    }

    public async Task<ServiceDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var service = await _repository.GetByIdAsync(id, cancellationToken);
        return service == null ? null : _mapper.Map<ServiceDto>(service);
    }

    public async Task<ServiceDto> CreateAsync(CreateServiceDto dto)
    {
        var service = _mapper.Map<Service>(dto);
        await _repository.AddAsync(service);
        return _mapper.Map<ServiceDto>(service);
    }

    public async Task<bool> UpdateAsync(int id, UpdateServiceDto dto, CancellationToken cancellationToken = default)
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