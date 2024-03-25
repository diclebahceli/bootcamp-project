using MediatR;

namespace socialMedia.Application;

public class CreatePostCommandRequest : IRequest<Unit>
{

    public string Description { get; set; }

}
