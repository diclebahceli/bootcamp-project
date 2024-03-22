using MediatR;

namespace socialMedia.Application;

public class CreateTeamCommandRequest : IRequest<Unit>
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Image { get; set; }


}
