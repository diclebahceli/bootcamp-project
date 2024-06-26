﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using socialMedia.Application;
using socialMedia.Application.Features;

namespace socialMedia.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class UserController : Controller
{
    IMediator mediator;

    public UserController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var response = await mediator.Send(new GetAllUsersRequest());
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetUserById([FromQuery] GetUserByIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUser([FromQuery] DeleteUserRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> AddUserToTeam([FromBody] AddUserToTeamRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> RemoveUserFromTeam([FromBody] RemoveUserFromTeamRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(UpdateUserCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

}
