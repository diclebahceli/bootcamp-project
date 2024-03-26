using MediatR;

namespace socialMedia.Application;

public class GetTeamsByUserIdQueryRequest: IRequest<GetTeamsByUserIdQueryResponse>
{
    public Guid UserId { get; set; }

}
