using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class UpdatePostCommandHandler : BaseHandler, IRequestHandler<UpdatePostCommandRequest, Unit>
{
    public UpdatePostCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(UpdatePostCommandRequest request, CancellationToken cancellationToken)
    {
        var post = await unitOfWork.GetReadRepository<Post>().GetAsync(x => x.Id == request.Id && !x.IsDeleted, enableTracking: true);
        var newObject = mapper.Map<Post, UpdatePostCommandRequest>(request);
        post.Description = newObject.Description;
        await unitOfWork.GetWriteRepository<Post>().UpdateAsync(post);
        await unitOfWork.SaveAsync();
        return Unit.Value;
    }
}
