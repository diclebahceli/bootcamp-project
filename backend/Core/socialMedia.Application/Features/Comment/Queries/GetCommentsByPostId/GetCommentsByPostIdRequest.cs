using MediatR;

namespace socialMedia.Application;

public class GetCommentsByPostIdRequest : IRequest<GetCommentsByPostIdResponse>
{
    public Guid Id { get; set; }
}
