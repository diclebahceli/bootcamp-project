namespace socialMedia.Domain;

public class Like : EntityBase
{
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid PostId { get; set; }
    public Post Post { get; set; }


    public Like(Guid userId, Guid postId)
    {
        this.UserId = userId;
        this.PostId = postId;
    }

    public Like()
    { }
}
