using MediatR;

namespace socialMedia.Application;

public class DeletePostCommandRequest : IRequest<Unit>
{
    public int Id { get; set; }

}
