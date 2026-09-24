namespace TravelogicBackend.Application.DTOs;

using TravelogicBackend.Domain.Enums;

// Read DTO
public record SupplierDto(
    int Id,
    string Name,
    string Address,
    Country Country,
    string Website,
    string PhoneNumber,
    IEnumerable<ServiceDto> Services
);

// Create DTO 
public record CreateSupplierDto(
    string Name,
    string Address,
    string Website,
    string PhoneNumber,
    Country Country
);

// Update DTO
public record UpdateSupplierDto(
   
    string Name,
    string Address,
    string Website,
    string PhoneNumber,
    Country Country
);