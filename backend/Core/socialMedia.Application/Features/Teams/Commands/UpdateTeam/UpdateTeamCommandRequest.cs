using MediatR;

namespace socialMedia.Application;

public class UpdateTeamCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Image { get; set; }
}
