using MediatR;

namespace socialMedia.Application;

public class GetPostsByTeamIdRequest : IRequest<GetPostsByTeamIdResponse>
{
    public Guid TeamId { get; set; }

}
