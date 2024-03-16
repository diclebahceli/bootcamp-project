using MediatR;

namespace socialMedia.Application;

public class UpdateTeamCommandRequest : IRequest
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string? Image { get; set; }
}
