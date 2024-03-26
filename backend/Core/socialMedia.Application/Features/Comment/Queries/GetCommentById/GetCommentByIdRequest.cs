using MediatR;

namespace socialMedia.Application;

public class GetCommentByIdRequest : IRequest<GetCommentByIdResponse>
{
    public Guid CommentId { get; set; }
}
