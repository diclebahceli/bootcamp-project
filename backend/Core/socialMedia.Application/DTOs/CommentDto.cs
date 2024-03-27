namespace socialMedia.Application;

public class CommentDto
{
    public Guid Id { get; set; }
    public string Description { get; set; } = null!;
    public Guid UserId { get; set; }
    public Guid PostId { get; set; }
}
