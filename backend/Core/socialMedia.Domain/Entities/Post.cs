namespace socialMedia.Domain;

public class Post : EntityBase
{
    public string Description { get; set; } = null!;
    public string? Image { get; set; }
    public Team Team { get; set; } = null!;
    public int TeamId { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; }
    public ICollection<Like> Likes { get; set; }

    public Post()
    {
        Comments = new List<Comment>();
        Likes = new List<Like>();
    }

    public Post(Guid UserId, string description, string image, DateTime createdDate, int groupId)
    {

        Comments = new List<Comment>();
        Likes = new List<Like>();
        this.UserId = UserId;
        Description = description;
        Image = image;
        CreatedDate = createdDate;
    }

}
