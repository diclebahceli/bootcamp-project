using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllTeamsQueryHandler : IRequestHandler<GetAllTeamsQueryRequest,GetAllTeamsQueryResponse>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllTeamsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<GetAllTeamsQueryResponse> Handle(GetAllTeamsQueryRequest request, CancellationToken cancellationToken)
    {
        var teams = await unityOfWork.GetReadRepository<Team>().GetAllAsync(predicate: x => x.IsDeleted == false);
        // List<GetAllTeamsQueryResponse> responses = Teams.Select(p => new GetAllTeamsQueryResponse
        // {
        //     Title = p.Name,
        //     Description = p.Description,
        //     StartTime = p.CreatedDate,
        //     Image = p.Image
        // }).ToList();

        
        var responses = new GetAllTeamsQueryResponse(){
            Teams = teams.Select(team => mapper.Map<TeamDto, Team>(team)).ToList()
        };
       

        return responses;
    }
}
