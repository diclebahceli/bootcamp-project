using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class DeletePostCommandHandler : BaseHandler, IRequestHandler<DeletePostCommandRequest, Unit>
{
    public DeletePostCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(DeletePostCommandRequest request, CancellationToken cancellationToken)
    {
        var post = await unitOfWork.GetReadRepository<Post>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        post.IsDeleted = true;
        await unitOfWork.GetWriteRepository<Post>().UpdateAsync(post);
        await unitOfWork.SaveAsync();
        return Unit.Value;
    }
}
