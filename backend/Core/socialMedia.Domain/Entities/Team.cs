namespace socialMedia.Domain;

public class Team
 : EntityBase
{
    public string Name { get; set; } = null!;

    public string OwnerId { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Image { get; set; }
    public ICollection<User> Users { get; set; } = null!;
    public ICollection<Post>? Posts { get; set; }

    public Team()
    {
        Users = new List<User>();
        Posts = new List<Post>();
    }

    public Team
    (string name, string description, string image)
    {

        Users = new List<User>();
        Posts = new List<Post>();
        Name = name;
        Description = description;
        Image = image;
    }

}
