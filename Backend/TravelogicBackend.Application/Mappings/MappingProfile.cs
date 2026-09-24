using AutoMapper;
using TravelogicBackend.Application.DTOs;
using TravelogicBackend.Domain.Entities;


namespace TravelogicBackend.Application.Mappings
{


    //i implemented automapper to avoid manual dto bloat
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Supplier Mappings
            CreateMap<Supplier, SupplierDto>();


            CreateMap<CreateSupplierDto, Supplier>()
                .ConstructUsing(src => new Supplier(src.Name, src.Address, src.Website, src.PhoneNumber, src.Country));


            CreateMap<UpdateSupplierDto, Supplier>()
    .ForMember(d => d.Id, opt => opt.Ignore());


            // Service Mappings
            CreateMap<Service, ServiceDto>();



            CreateMap<CreateServiceDto, Service>()
                .ConstructUsing(src => new Service(src.Title, src.Description, src.SupplierId));



            CreateMap<UpdateServiceDto, Service>()
                .ForMember(d => d.Id, opt => opt.Ignore());
        }
    }
}