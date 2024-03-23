using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreateTeamCommandHandler : BaseHandler, IRequestHandler<CreateTeamCommandRequest, Unit>
{

    public CreateTeamCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {


    }

    public async Task<Unit> Handle(CreateTeamCommandRequest request, CancellationToken cancellationToken)
    {
        Team team = new(request.Title, request.Description, request.Image);
        await unitOfWork.GetWriteRepository<Team>().AddAsync(team);
        await unitOfWork.SaveAsync();

        return Unit.Value;
    }

}
