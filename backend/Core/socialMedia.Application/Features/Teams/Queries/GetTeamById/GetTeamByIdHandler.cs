using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetTeamByIdHandler : BaseHandler, IRequestHandler<GetTeamByIdRequest, GetTeamByIdResponse>
{
    public GetTeamByIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetTeamByIdResponse> Handle(GetTeamByIdRequest request, CancellationToken cancellationToken)
    {
        var team = await unitOfWork.GetReadRepository<Team>().GetAsync(predicate: t => t.Id == request.Id && !t.IsDeleted, enableTracking: false) ?? throw new Exception("Team not found");
        return new GetTeamByIdResponse()
        {
            Team = mapper.Map<TeamDto, Team>(team)
        };
    }
}
