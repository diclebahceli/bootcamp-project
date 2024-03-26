using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class UpdateCommentCommandHandler : BaseHandler, IRequestHandler<UpdateCommentCommandRequest, Unit>
{
    public UpdateCommentCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(UpdateCommentCommandRequest request, CancellationToken cancellationToken)
    {
        var comment = await unitOfWork.GetReadRepository<Comment>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        var newObject = mapper.Map<Comment, UpdateCommentCommandRequest>(request);
        comment.Description = newObject.Description;
        await unitOfWork.GetWriteRepository<Comment>().UpdateAsync(comment);
        await unitOfWork.SaveAsync();
        return Unit.Value;
    }
}
