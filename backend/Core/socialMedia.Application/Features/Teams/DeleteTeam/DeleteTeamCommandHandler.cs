using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class DeleteTeamCommandHandler : IRequestHandler<DeleteTeamCommandRequest, Unit>
{
    private readonly IUnitOfWork _unitOfWork;
    public DeleteTeamCommandHandler(IUnitOfWork unitOfWork)
    {
        this._unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(DeleteTeamCommandRequest request, CancellationToken cancellationToken)
    {
        var product = await _unitOfWork.GetReadRepository<Team>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        product.IsDeleted = true;
        await _unitOfWork.GetWriteRepository<Team>().UpdateAsync(product);
        await _unitOfWork.SaveAsync();
        return Unit.Value;

    }

}

