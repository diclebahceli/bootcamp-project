namespace socialMedia.Domain;

public class User : EntityBase
{

    public ICollection<Team> Teams { get; set; }
    public ICollection<Post> Posts { get; set; }
    public ICollection<Comment> Comments { get; set; }

    public User()
    {
        Teams = new List<Team>();
        Posts = new List<Post>();
        Comments = new List<Comment>();
    }


}
