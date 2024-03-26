using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class DeleteCommentCommandHandler : BaseHandler, IRequestHandler<DeleteCommentCommandRequest, Unit>
{
    public DeleteCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(DeleteCommentCommandRequest request, CancellationToken cancellationToken)
    {
        var comment = await unitOfWork.GetReadRepository<Comment>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        comment.IsDeleted = true;
        await unitOfWork.GetWriteRepository<Comment>().UpdateAsync(comment);
        await unitOfWork.SaveAsync();
        return Unit.Value;
    }
}
