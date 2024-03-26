using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetPostsByTeamIdHandler : BaseHandler, IRequestHandler<GetPostsByTeamIdRequest, GetPostsByTeamIdResponse>
{
    public GetPostsByTeamIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetPostsByTeamIdResponse> Handle(GetPostsByTeamIdRequest request, CancellationToken cancellationToken)
    {
        var posts = await unitOfWork.GetReadRepository<Post>().GetAllAsync(predicate: x => x.TeamId == request.TeamId && !x.IsDeleted, enableTracking: false);

        return new GetPostsByTeamIdResponse()
        {
            Posts = posts.Select(x => mapper.Map<PostDto, Post>(x)).ToList()
        };



    }
}
