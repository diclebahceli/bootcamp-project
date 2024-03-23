using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class DeleteTeamCommandHandler : BaseHandler, IRequestHandler<DeleteTeamCommandRequest, Unit>
{
    public DeleteTeamCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(DeleteTeamCommandRequest request, CancellationToken cancellationToken)
    {
        var product = await unitOfWork.GetReadRepository<Team>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        product.IsDeleted = true;
        await unitOfWork.GetWriteRepository<Team>().UpdateAsync(product);
        await unitOfWork.SaveAsync();
        return Unit.Value;

    }

}

