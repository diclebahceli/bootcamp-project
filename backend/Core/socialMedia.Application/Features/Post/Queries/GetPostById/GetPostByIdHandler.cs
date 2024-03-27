using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetPostByIdHandler : BaseHandler, IRequestHandler<GetPostByIdRequest, GetPostByIdResponse>
{
    public GetPostByIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetPostByIdResponse> Handle(GetPostByIdRequest request, CancellationToken cancellationToken)
    {
        var post = await unitOfWork.GetReadRepository<Post>().GetAsync(predicate: t => t.Id == request.PostId && !t.IsDeleted
        , include: x => x.Include(x => x.Comments).Include(x => x.Likes)
        , enableTracking: false) ?? throw new Exception("Post not found");
        return new GetPostByIdResponse()
        {
            Post = mapper.Map<PostDto, Post>(post),
            Comments = post.Comments.Select(x => mapper.Map<CommentDto, Comment>(x)).ToList(),
            Likes = post.Likes.Select(x => mapper.Map<LikeDto, Like>(x)).ToList()
        };

    }

}
