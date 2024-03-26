using MediatR;
using Microsoft.AspNetCore.Authorization;
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

    public async Task<IActionResult> GetAllTeams()
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

    [HttpPut]
    public async Task<IActionResult> UpdateTeam(UpdateTeamCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }


    [HttpDelete]
    public async Task<IActionResult> DeleteTeam(DeleteTeamCommandRequest request)
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetTeamById(GetTeamByIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetTeamsByUserId(GetTeamsByUserIdQueryRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

}
