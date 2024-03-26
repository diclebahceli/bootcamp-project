using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetTeamsByUserIdQueryHandler : BaseHandler, IRequestHandler<GetTeamsByUserIdQueryRequest, GetTeamsByUserIdQueryResponse>
{
    public GetTeamsByUserIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetTeamsByUserIdQueryResponse> Handle(GetTeamsByUserIdQueryRequest request, CancellationToken cancellationToken)
    {
        var teams = await unitOfWork.GetReadRepository<Team>().GetAllAsync(predicate: x => x.IsDeleted == false,
        include: x => x.Include(x => x.Users), enableTracking: true);

        teams = teams.Where(x => x.Users.Any(x => x.Id == request.UserId)).ToList();


        var response = new GetTeamsByUserIdQueryResponse()
        {
            Teams = teams.Select(x => mapper.Map<TeamDto, Team>(x)).ToList()
        };

        return response;
    }
}
