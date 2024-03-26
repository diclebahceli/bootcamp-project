using MediatR;

namespace socialMedia.Application;

public class GetPostsByTeamIdRequest : IRequest<GetPostsByTeamIdResponse>
{
    public int TeamId { get; set; }

}
