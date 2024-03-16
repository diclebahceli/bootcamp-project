using MediatR;

namespace socialMedia.Application;

public class GetAllTeamsQueryRequest : IRequest<IList<GetAllTeamsQueryResponse>>
{

}
