using MediatR;

namespace socialMedia.Application;

public class GetAllLikesQueryRequest : IRequest<GetAllLikesQueryResponse>
{
    public int Id { get; set; }
}
