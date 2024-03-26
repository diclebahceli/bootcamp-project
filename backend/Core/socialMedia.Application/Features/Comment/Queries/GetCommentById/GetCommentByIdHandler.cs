using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetCommentByIdHandler : BaseHandler, IRequestHandler<GetCommentByIdRequest, GetCommentByIdResponse>
{
    public GetCommentByIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetCommentByIdResponse> Handle(GetCommentByIdRequest request, CancellationToken cancellationToken)
    {
        var comment = await unitOfWork.GetReadRepository<Comment>().GetAsync(predicate: t => t.Id == request.CommentId && !t.IsDeleted, enableTracking: false) ?? throw new Exception("Comment not found");
        return new GetCommentByIdResponse()
        {
            Comment = mapper.Map<CommentDto, Comment>(comment)
        };
    }
}
