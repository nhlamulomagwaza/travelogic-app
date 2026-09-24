using TravelogicBackend.Domain.Common;

namespace TravelogicBackend.Domain.Entities;

public class Service: ITrackable, ISoftDeletable
{
    public int Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;

   
    public int SupplierId { get; set; }
    public Supplier? Supplier { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;



    //Soft Delete
    public bool IsDeleted { get; set; } = false;


    //Deleted At


    public DateTime? DeletedAt { get; set; } = null;




    //private constructor for EF Core entity reflection
    //blank instance of the service object ef core will fill via reflection
    private Service() { }


    //not for validation but to ensure that the service object cannot exist without these fields
    public Service(string title, string description, int supplierId)
    {
        Title = title;
        Description = description;
        SupplierId = supplierId;
    }
}