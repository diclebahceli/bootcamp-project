namespace socialMedia.Application;

public class CommentDto
{
    public int Id { get; set; }
    public string Description { get; set; } = null!;
    public Guid UserId { get; set; }
}
