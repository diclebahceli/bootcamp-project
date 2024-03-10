namespace socialMedia.Domain;

public class User: EntityBase
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Image { get; set; }
    public ICollection<Group> Groups { get; set; }
    public ICollection<Post> Posts { get; set; }
    public ICollection<Comment> Comments { get; set; }
    
    
}
