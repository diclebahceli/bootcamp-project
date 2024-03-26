using MediatR;

namespace socialMedia.Application;

public class CreateCommentCommandRequest : IRequest<Unit>
{
    public Guid UserId { get; set; }
    public Guid PostId { get; set; }
    public string Description { get; set; }
}
