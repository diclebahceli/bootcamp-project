using MediatR;

namespace socialMedia.Application;

public class GetTeamByIdRequest : IRequest<GetTeamByIdResponse>
{
    public Guid Id { get; set; }
}
