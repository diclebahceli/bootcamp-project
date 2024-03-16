using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class UpdateTeamCommandHandler : IRequestHandler<UpdateTeamCommandRequest>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public UpdateTeamCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        this._unitOfWork = unitOfWork;
        this._mapper = mapper;
    }
    public async Task Handle(UpdateTeamCommandRequest request, CancellationToken cancellationToken)
    {
        var team = await _unitOfWork.GetReadRepository<Team>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        var newObject = _mapper.Map<Team, UpdateTeamCommandRequest>(request);
        team.Name = newObject.Name;
        team.Description = newObject.Description;
        team.Image = newObject.Image;
        await _unitOfWork.GetWriteRepository<Team>().UpdateAsync(team);
        await _unitOfWork.SaveAsync();
    }

}
