using MediatR;
using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQueryRequest, GetAllCommentsQueryResponse>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllCommentsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<GetAllCommentsQueryResponse> Handle(GetAllCommentsQueryRequest request, CancellationToken cancellationToken)
    {
        var comments = await unityOfWork.GetReadRepository<Comment>().GetAllAsync(predicate: x => x.IsDeleted == false);

        var response = new GetAllCommentsQueryResponse
        {
            Comments = comments.Select(x => mapper.Map<CommentDto, Comment>(x)).ToList()
        };

        return response;
    }
}
