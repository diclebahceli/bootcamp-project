using MediatR;
using Microsoft.EntityFrameworkCore;
using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllLikesQueryHandler : IRequestHandler<GetAllLikesQueryRequest, GetAllLikesQueryResponse>
{
    private IUnitOfWork unityOfWork;
    private readonly IMapper mapper;
    public GetAllLikesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        unityOfWork = unitOfWork;
        this.mapper = mapper;
    }


    public async Task<GetAllLikesQueryResponse> Handle(GetAllLikesQueryRequest request, CancellationToken cancellationToken)
    {
        var likes = await unityOfWork.GetReadRepository<Like>().GetAllAsync(predicate: x => x.IsDeleted == false && x.PostId == request.Id);


        return new GetAllLikesQueryResponse()
        {
            Count = likes.Count
        };
    }
}
