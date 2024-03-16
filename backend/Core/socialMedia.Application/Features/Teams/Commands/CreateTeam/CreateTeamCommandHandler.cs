using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreateTeamCommandHandler : IRequestHandler<CreateTeamCommandRequest>
{
    private readonly IUnitOfWork _unitOfWork;
    public CreateTeamCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }

    public async Task Handle(CreateTeamCommandRequest request, CancellationToken cancellationToken)
    {
        Team team = new(request.Name, request.Description, request.Image);
        await _unitOfWork.GetWriteRepository<Team>().AddAsync(team);
        await _unitOfWork.SaveAsync();
    }

}
