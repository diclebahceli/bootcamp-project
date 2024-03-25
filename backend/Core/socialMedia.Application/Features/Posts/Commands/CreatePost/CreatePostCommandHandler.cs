using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreatePostCommandHandler : BaseHandler, IRequestHandler<CreatePostCommandRequest, Unit>
{
    public CreatePostCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(CreatePostCommandRequest request, CancellationToken cancellationToken)
    {
        Post post = new()
        {
            Description = request.Description,
        };
        await unitOfWork.GetWriteRepository<Post>().AddAsync(post);
        await unitOfWork.SaveAsync();

        return Unit.Value;
    }
}
