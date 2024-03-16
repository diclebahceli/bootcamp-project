using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllTeamsQueryHandler : IRequestHandler<GetAllTeamsQueryRequest, IList<GetAllTeamsQueryResponse>>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllTeamsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<IList<GetAllTeamsQueryResponse>> Handle(GetAllTeamsQueryRequest request, CancellationToken cancellationToken)
    {
        var Teams = await unityOfWork.GetReadRepository<Team>().GetAllAsync();
        // List<GetAllTeamsQueryResponse> responses = Teams.Select(p => new GetAllTeamsQueryResponse
        // {
        //     Title = p.Name,
        //     Description = p.Description,
        //     StartTime = p.CreatedDate,
        //     Image = p.Image
        // }).ToList();

        var responses = mapper.Map<GetAllTeamsQueryResponse, Team>(Teams);

        return responses;
    }
}
