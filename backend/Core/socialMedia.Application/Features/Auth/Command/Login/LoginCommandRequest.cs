using System.ComponentModel;
using MediatR;

namespace socialMedia.Application;

public class LoginCommandRequest : IRequest<LoginCommandResponse>
{

    [DefaultValue("Example@gmail.com")]
    public string Email { get; set; }
    [DefaultValue("123456")]
    public string Password { get; set; }
}
