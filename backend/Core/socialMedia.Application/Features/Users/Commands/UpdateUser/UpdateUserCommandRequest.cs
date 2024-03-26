using MediatR;

namespace socialMedia.Application;

public class UpdateUserCommandRequest : IRequest<Unit>
{
    public UserDto User { get; set; }
}
