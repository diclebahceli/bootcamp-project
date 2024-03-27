using MediatR;

namespace socialMedia.Application;

public class UpdateUserCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
}
