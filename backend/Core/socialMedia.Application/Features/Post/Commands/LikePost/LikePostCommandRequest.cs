using MediatR;

namespace socialMedia.Application;

public class LikePostCommandRequest : IRequest<Unit>
{
    public Guid UserId { get; set; }

    public Guid PostId { get; set; }

}
