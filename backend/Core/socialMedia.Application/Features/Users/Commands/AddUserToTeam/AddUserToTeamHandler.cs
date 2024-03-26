using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using socialMedia.Domain;

namespace socialMedia.Application;

public class AddUserToTeamHandler : BaseHandler, IRequestHandler<AddUserToTeamRequest, Unit>
{
    UserManager<User> userManager;
    public AddUserToTeamHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<Unit> Handle(AddUserToTeamRequest request, CancellationToken cancellationToken)
    {
        var team = await unitOfWork.GetReadRepository<Team>().GetAsync(predicate: x => x.Id == request.TeamId && !x.IsDeleted, enableTracking: true);
        if (team is null) throw new Exception("Team not found");
        var user = await userManager.FindByIdAsync(request.UserId.ToString()) ?? throw new Exception("User not found");
        if (!user.Teams.Contains(team))
            user.Teams.Add(team);

        await unitOfWork.SaveAsync();
        return Unit.Value;
    }
}
