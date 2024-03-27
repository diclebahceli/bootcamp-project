using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreateCommentCommandHandler : BaseHandler, IRequestHandler<CreateCommentCommandRequest, CreateCommentCommandResponse>
{
    public CreateCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<CreateCommentCommandResponse> Handle(CreateCommentCommandRequest request, CancellationToken cancellationToken)
    {
        Comment comment = new()
        {
            Description = request.Description,
            PostId = request.PostId,
            UserId = request.UserId
        };
        await unitOfWork.GetWriteRepository<Comment>().AddAsync(comment);
        await unitOfWork.SaveAsync();

        var response = new CreateCommentCommandResponse
        {
            Comment = mapper.Map<CommentDto, Comment>(comment)
        };
        return response;
    }
}
