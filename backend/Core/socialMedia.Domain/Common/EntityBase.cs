namespace socialMedia.Domain;

public class EntityBase : IEntityBase
{

    public Guid Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsDeleted { get; set; } = false;
}
