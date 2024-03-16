namespace socialMedia.Domain;

public class Comment : EntityBase
{
    public string Description { get; set; } = null!;
    public int? PostId { get; set; }
    public Post? Post { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public Comment()
    {

    }

    public Comment(string description, int postId, int userId)
    {
        Description = description;
        PostId = postId;
        UserId = userId;
    }
}
