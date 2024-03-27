namespace socialMedia.Application;

public class TeamDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public string? Image { get; set; }
}
