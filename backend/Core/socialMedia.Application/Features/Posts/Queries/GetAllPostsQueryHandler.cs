using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllPostsQueryHandler
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllPostsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<IList<GetAllPostsQueryResponse>> Handle(GetAllTeamsQueryRequest request, CancellationToken cancellationToken)
    {
        var Posts = await unityOfWork.GetReadRepository<Post>().GetAllAsync(include: q => q.Include(q => q.Team));
        mapper.Config<TeamDto, Team>();
        // List<GetAllTeamsQueryResponse> responses = Teams.Select(p => new GetAllTeamsQueryResponse
        // {
        //     Title = p.Title,
        //     Description = p.Description,
        //     EndTime = p.EndTime,
        //     StartTime = p.StartTime
        // }).ToList();

        var response = mapper.Map<GetAllPostsQueryResponse, Post>(Posts);

        return response;
    }
}
