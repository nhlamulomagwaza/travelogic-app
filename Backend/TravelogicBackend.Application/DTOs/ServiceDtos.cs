namespace TravelogicBackend.Application.DTOs;

// Read DTO
public record ServiceDto(
    int Id,
    string Title,
    string Description,
    int SupplierId
);

// Create DTO 
public record CreateServiceDto(
    string Title,
    string Description,
    int SupplierId
);

// Update DTO
public record UpdateServiceDto(
  
    string Title,
    string Description
);