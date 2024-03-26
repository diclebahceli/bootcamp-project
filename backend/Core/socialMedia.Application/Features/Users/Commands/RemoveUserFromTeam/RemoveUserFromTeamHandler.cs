using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using socialMedia.Domain;

namespace socialMedia.Application;

public class RemoveUserFromTeamHandler : BaseHandler, IRequestHandler<RemoveUserFromTeamRequest, Unit>
{
    UserManager<User> userManager;
    public RemoveUserFromTeamHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(RemoveUserFromTeamRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.UserId.ToString()) ?? throw new Exception("User not found");
        var team = await unitOfWork.GetReadRepository<Team>().GetAsync(predicate: x => x.Id == request.TeamId && !x.IsDeleted, enableTracking: true) ?? throw new Exception("Team not found");

        if (team.Users.Any(u => u.Id == request.UserId))
            team.Users.Remove(user);
        else
        {
            throw new Exception("User is not in this team");
        }
        return Unit.Value;
    }
}
