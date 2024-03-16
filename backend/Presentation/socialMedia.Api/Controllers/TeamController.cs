using MediatR;
using Microsoft.AspNetCore.Mvc;
using socialMedia.Application;

namespace socialMedia.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class TeamController : ControllerBase
{
    private IMediator mediator;

    public TeamController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var response = await mediator.Send(new GetAllTeamsQueryRequest());
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeam(CreateTeamCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> UpdateTeam(UpdateTeamCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }


    [HttpDelete]
    public async Task<IActionResult> DeleteCompetition(DeleteTeamCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }
}
