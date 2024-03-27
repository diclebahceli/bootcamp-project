using MediatR;

namespace socialMedia.Application;

public class GetAllLikesQueryRequest : IRequest<GetAllLikesQueryResponse>
{
    public Guid Id { get; set; }
}
