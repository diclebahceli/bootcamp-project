using MediatR;

namespace socialMedia.Application;

public class DeletePostCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }

}
