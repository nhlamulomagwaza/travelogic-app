using TravelogicBackend.Domain.Common;
using TravelogicBackend.Domain.Enums;

namespace TravelogicBackend.Domain.Entities
{
    public class Supplier: ITrackable, ISoftDeletable
    {

        //private setters to ensure that the fields cannot be changed by outside classes

        public int Id { get; private set; }
        public string Name { get; private set; } = string.Empty;//string.empty to to avoid null errors 
        public string Address { get; private set; } = string.Empty;
        public Country Country { get; private set; } = Country.SouthAfrica; //default country to avoid null errors

        public string Website { get; private set; } = string.Empty;
        public string PhoneNumber { get; private set; } = string.Empty;
             public ICollection<Service> Services { get; private set; } = new List<Service>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        //Soft Delete
        public bool IsDeleted { get; set; } = false;


        //Deleted At


        public DateTime? DeletedAt { get; set; } = null;


        //private Constructor for EF Core entity reflection
        private Supplier() { }


        //the public constructor is not for validation
        //but to ensure that the supplier object cannot exist without these fields
        public Supplier(string name, string address, string website,
            string phoneNumber, Enum country)
        {
           
            Name = name;
            Address = address;
            Website = website;
            PhoneNumber = phoneNumber;
            Country = (Country)country;
        }


    }
}
