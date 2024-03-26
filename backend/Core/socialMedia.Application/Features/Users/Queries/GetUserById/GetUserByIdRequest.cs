using MediatR;

namespace socialMedia.Application.Features;
public class GetUserByIdRequest : IRequest<GetUserByIdResponse>
{
    public string Id { get; set; }

}
