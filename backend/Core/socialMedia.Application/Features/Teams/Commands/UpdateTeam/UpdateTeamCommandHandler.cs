using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class UpdateTeamCommandHandler : BaseHandler, IRequestHandler<UpdateTeamCommandRequest, Unit>
{

    public UpdateTeamCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }
    public async Task<Unit> Handle(UpdateTeamCommandRequest request, CancellationToken cancellationToken)
    {
        var team = await unitOfWork.GetReadRepository<Team>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        var newObject = mapper.Map<Team, UpdateTeamCommandRequest>(request);
        team.Title = newObject.Title;
        team.Description = newObject.Description;
        team.Image = newObject.Image;
        await unitOfWork.GetWriteRepository<Team>().UpdateAsync(team);
        await unitOfWork.SaveAsync();
        return Unit.Value;
    }

}
