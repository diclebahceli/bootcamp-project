using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreateCommentCommandHandler : BaseHandler, IRequestHandler<CreateCommentCommandRequest, Unit>
{
    public CreateCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(CreateCommentCommandRequest request, CancellationToken cancellationToken)
    {
        Comment comment = new()
        {
            Description = request.Description,
            PostId = request.PostId,
            UserId = request.UserId
        };
        await unitOfWork.GetWriteRepository<Comment>().AddAsync(comment);
        await unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
