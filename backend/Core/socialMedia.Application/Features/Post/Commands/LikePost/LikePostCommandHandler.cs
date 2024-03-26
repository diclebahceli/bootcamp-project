using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class LikePostCommandHandler : BaseHandler, IRequestHandler<LikePostCommandRequest, Unit>
{
    public LikePostCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(LikePostCommandRequest request, CancellationToken cancellationToken)
    {
        var liker = await unitOfWork.GetReadRepository<Like>().GetAsync(predicate: l => l.PostId == request.PostId && l.UserId == request.UserId, enableTracking: true);
        if (liker is not null)
        {
            if (liker.IsDeleted)
            {
                liker.IsDeleted = false;
                await unitOfWork.GetWriteRepository<Like>().UpdateAsync(liker);
                await unitOfWork.SaveAsync();
            }
            else
            {
                liker.IsDeleted = true;
                await unitOfWork.GetWriteRepository<Like>().UpdateAsync(liker);
                await unitOfWork.SaveAsync();
            }

        }
        else
        {
            liker = new Like()
            {
                PostId = request.PostId,
                UserId = request.UserId
            };

            await unitOfWork.GetWriteRepository<Like>().AddAsync(liker);
            await unitOfWork.SaveAsync();
        }
        return Unit.Value;
    }
}
