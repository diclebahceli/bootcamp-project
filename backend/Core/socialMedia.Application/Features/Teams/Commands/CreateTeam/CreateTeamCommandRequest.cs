using MediatR;

namespace socialMedia.Application;

public class CreateTeamCommandRequest : IRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string? Image { get; set; }


}
