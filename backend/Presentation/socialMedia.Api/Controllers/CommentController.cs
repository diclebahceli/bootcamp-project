using MediatR;
using Microsoft.AspNetCore.Mvc;
using socialMedia.Application;

namespace socialMedia.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class CommentController : Controller
{
    private IMediator mediator;

    public CommentController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllComments()
    {
        var response = await mediator.Send(new GetAllCommentsQueryRequest());
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetCommentsByPostId([FromQuery] GetCommentsByPostIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetCommentById([FromQuery] GetCommentByIdRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment([FromBody] CreateCommentCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateComment([FromBody] UpdateCommentCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteComment([FromBody] DeleteCommentCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }
}
