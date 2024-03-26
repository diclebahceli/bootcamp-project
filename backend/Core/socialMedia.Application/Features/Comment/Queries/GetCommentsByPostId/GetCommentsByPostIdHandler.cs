using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetCommentsByPostIdHandler : BaseHandler, IRequestHandler<GetCommentsByPostIdRequest, GetCommentsByPostIdResponse>
{
    public GetCommentsByPostIdHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetCommentsByPostIdResponse> Handle(GetCommentsByPostIdRequest request, CancellationToken cancellationToken)
    {
        var comments = await unitOfWork.GetReadRepository<Comment>().GetAllAsync(x => x.IsDeleted == false && x.PostId == request.Id);

        var res = new GetCommentsByPostIdResponse()
        {
            Comments = comments.Select(x => mapper.Map<CommentDto, Comment>(x)).ToList()
        };
        return res;
    }
}
