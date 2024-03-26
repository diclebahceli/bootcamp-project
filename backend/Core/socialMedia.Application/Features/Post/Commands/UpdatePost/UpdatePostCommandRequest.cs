using MediatR;

namespace socialMedia.Application;

public class UpdatePostCommandRequest : IRequest<Unit>
{

    public Guid Id { get; set; }
    public string Description { get; set; } = null!;
}
