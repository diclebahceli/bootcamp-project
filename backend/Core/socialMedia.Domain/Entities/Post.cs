namespace socialMedia.Domain;

public class Post : EntityBase
{
    public string Description { get; set; }
    public string Image { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public int GroupId { get; set; }
    public Group Group { get; set; }
    public ICollection<Comment> Comments { get; set; }

}
