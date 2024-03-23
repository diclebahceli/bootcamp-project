using MediatR;
using Microsoft.AspNetCore.Mvc;
using socialMedia.Application;

namespace socialMedia.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator mediator;

    public AuthController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterCommandRequest request)
    {
        await mediator.Send(request);
        return StatusCode(StatusCodes.Status201Created);
    }
}
