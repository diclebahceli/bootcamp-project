namespace socialMedia.Application;

public class PostDto
{
    public Guid Id { get; set; }
    public string? Description { get; set; }
    public Guid TeamId { get; set; }
    public Guid UserId { get; set; }
    public string? Image { get; set; }
}


