using MediatR;

namespace socialMedia.Application;

public class UpdatePostCommandRequest : IRequest<Unit>
{

    public int Id { get; set; }
    public string Description { get; set; } = null!;
}
