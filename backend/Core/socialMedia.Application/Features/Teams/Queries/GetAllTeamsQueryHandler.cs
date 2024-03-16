using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllTeamsQueryHandler : IRequestHandler<GetAllTeamsQueryRequest, IList<GetAllTeamsQueryResponse>>
{
    private IUnitOfWork unityOfWork;
    public GetAllTeamsQueryHandler(IUnitOfWork unitOfWork)
    {
        unityOfWork = unitOfWork;
    }


    public async Task<IList<GetAllTeamsQueryResponse>> Handle(GetAllTeamsQueryRequest request, CancellationToken cancellationToken)
    {
        var Teams = await unityOfWork.GetReadRepository<Team>().GetAllAsync();
        List<GetAllTeamsQueryResponse> responses = Teams.Select(p => new GetAllTeamsQueryResponse
        {
            Title = p.Name,
            Description = p.Description,
            StartTime = p.CreatedDate,
            Image = p.Image
        }).ToList();
        return responses;
    }
}
