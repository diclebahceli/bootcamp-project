using MediatR;

namespace socialMedia.Application;

public class CreatePostCommandRequest : IRequest<CreatePostCommandResponse>
{

    public string Description { get; set; }
    public Guid TeamId { get; set; }
    public Guid UserId { get; set; }

}
