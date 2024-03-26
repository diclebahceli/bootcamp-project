using MediatR;

namespace socialMedia.Application;

public class RemoveUserFromTeamRequest : IRequest<Unit>
{
    public Guid UserId { get; set; }
    public Guid TeamId { get; set; }

}
