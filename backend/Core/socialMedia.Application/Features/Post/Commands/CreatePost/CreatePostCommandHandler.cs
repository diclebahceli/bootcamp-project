using MediatR;
using Microsoft.AspNetCore.Http;
using socialMedia.Domain;

namespace socialMedia.Application;

public class CreatePostCommandHandler : BaseHandler, IRequestHandler<CreatePostCommandRequest, CreatePostCommandResponse>
{
    public CreatePostCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<CreatePostCommandResponse> Handle(CreatePostCommandRequest request, CancellationToken cancellationToken)
    {
        Post post = new()
        {
            UserId = request.UserId,
            Description = request.Description,
            TeamId = request.TeamId
        };

        await unitOfWork.GetWriteRepository<Post>().AddAsync(post);
        await unitOfWork.SaveAsync();

        var response = new CreatePostCommandResponse
        {
            Post = mapper.Map<PostDto, Post>(post)
        };
        return response;


    }
}
