using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetTeamByIdHandler : BaseHandler, IRequestHandler<GetTeamByIdRequest, GetTeamByIdResponse>
{
    public GetTeamByIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetTeamByIdResponse> Handle(GetTeamByIdRequest request, CancellationToken cancellationToken)
    {
        var team = await unitOfWork.GetReadRepository<Team>().GetAsync(predicate: t => t.Id == request.Id && !t.IsDeleted
        , include: x => x.Include(x => x.Users).Include(x => x.Posts)
        , enableTracking: false) ?? throw new Exception("Team not found");
        return new GetTeamByIdResponse()
        {
            Team = mapper.Map<TeamDto, Team>(team),
            Users = team.Users.Select(x => mapper.Map<UserDto, User>(x)).ToList(),
            Posts = team.Posts.Select(x => mapper.Map<PostDto, Post>(x)).ToList()
        };
    }
}
