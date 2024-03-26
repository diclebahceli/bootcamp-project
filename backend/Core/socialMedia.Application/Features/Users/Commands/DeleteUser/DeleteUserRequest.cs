using MediatR;

namespace socialMedia.Application.Features;

public class DeleteUserRequest : IRequest<Unit>
{
    public Guid Id { get; set; }

}
