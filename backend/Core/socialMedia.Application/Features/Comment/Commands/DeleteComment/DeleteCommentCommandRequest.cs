using MediatR;

namespace socialMedia.Application;

public class DeleteCommentCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }

}