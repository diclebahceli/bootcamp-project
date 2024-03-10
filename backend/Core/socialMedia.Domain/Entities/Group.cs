namespace socialMedia.Domain;

public class Group : EntityBase
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Image { get; set; }
    public ICollection<User> Users { get; set; } = null!;
    public ICollection<Post>? Posts { get; set; }

    public Group()
    {

    }

    public Group(string name, string description, string image)
    {
        Name = name;
        Description = description;
        Image = image;
    }

}
