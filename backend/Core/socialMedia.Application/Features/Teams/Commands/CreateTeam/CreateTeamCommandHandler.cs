using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreateTeamCommandHandler : BaseHandler, IRequestHandler<CreateTeamCommandRequest, CreateTeamCommandResponse>
{
    private readonly UserManager<User> userManager;

    public CreateTeamCommandHandler(UserManager<User> userManager, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
    }

    public async Task<CreateTeamCommandResponse> Handle(CreateTeamCommandRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.OwnerId.ToString()) ?? throw new Exception("User not found");
        Team team = new()
        {
            OwnerId = request.OwnerId,
            Title = request.Title,
            Description = request.Description,
            Image = request.Image,
            Users = new List<User>()
            {
                user
            }

        };
        await unitOfWork.GetWriteRepository<Team>().AddAsync(team);
        await unitOfWork.SaveAsync();

        return new CreateTeamCommandResponse
        {
            Team = mapper.Map<TeamDto, Team>(team)
        };
    }

}
