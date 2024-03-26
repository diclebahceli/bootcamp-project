using MediatR;

namespace socialMedia.Application;

public class UpdateCommentCommandRequest : IRequest<Unit>
{

    public Guid Id { get; set; }
    public string Description { get; set; } = null!;
}
