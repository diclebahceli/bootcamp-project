namespace socialMedia.Domain;

public class Group : EntityBase
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public ICollection<User> Users { get; set; }
    public ICollection<Post> Posts { get; set; }

}
