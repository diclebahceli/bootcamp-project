using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetPostByIdHandler : BaseHandler, IRequestHandler<GetPostByIdRequest, GetPostByIdResponse>
{
    public GetPostByIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetPostByIdResponse> Handle(GetPostByIdRequest request, CancellationToken cancellationToken)
    {
        var post = await unitOfWork.GetReadRepository<Post>().GetAsync(predicate: t => t.Id == request.PostId && !t.IsDeleted, enableTracking: false) ?? throw new Exception("Post not found");
        return new GetPostByIdResponse()
        {
            Post = mapper.Map<PostDto, Post>(post)
        };

    }

}
