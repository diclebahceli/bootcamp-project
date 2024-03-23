using MediatR;

namespace socialMedia.Application;

public class RevokeCommandRequest : IRequest<Unit>
{
    public string Email { get; set; }
}
