using MediatR;
using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQueryRequest, GetAllPostsQueryResponse>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllPostsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<GetAllPostsQueryResponse> Handle(GetAllPostsQueryRequest request, CancellationToken cancellationToken)
    {
        var posts = await unityOfWork.GetReadRepository<Post>().GetAllAsync(predicate: x => !x.IsDeleted, enableTracking: false);


        var response = new GetAllPostsQueryResponse()
        {
            Posts = posts.Select(p => mapper.Map<PostDto, Post>(p)).ToList()
        };


        return response;
    }
}
