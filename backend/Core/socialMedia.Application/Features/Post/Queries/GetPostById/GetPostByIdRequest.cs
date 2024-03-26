using MediatR;

namespace socialMedia.Application;

public class GetPostByIdRequest : IRequest<GetPostByIdResponse>
{
    public Guid PostId { get; set; }

}
