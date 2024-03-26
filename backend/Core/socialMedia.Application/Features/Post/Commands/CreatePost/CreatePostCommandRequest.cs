using MediatR;

namespace socialMedia.Application;

public class CreatePostCommandRequest : IRequest<Unit>
{

    public string Description { get; set; }
    public int TeamId { get; set; }
    public Guid UserId { get; set; }

}
