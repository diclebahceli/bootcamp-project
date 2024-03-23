using MediatR;

namespace socialMedia.Application;

public class RegisterCommandRequest : IRequest<Unit>
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmedPassword { get; set; }

}
