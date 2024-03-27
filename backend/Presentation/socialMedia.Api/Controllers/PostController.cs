using MediatR;
using Microsoft.AspNetCore.Mvc;
using socialMedia.Application;

namespace socialMedia.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public class PostController : Controller
{
    private IMediator mediator;

    public PostController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetPostLikeCount([FromQuery] Guid id)
    {
        var response = await mediator.Send(new GetAllLikesQueryRequest() { Id = id });
        return Ok(response);
    }

    //get all
    [HttpGet]
    public async Task<IActionResult> GetAllPosts()
    {
        var response = await mediator.Send(new GetAllPostsQueryRequest());
        return Ok(response);
    }

    //get by id
    [HttpGet]
    public async Task<IActionResult> GetPostById([FromQuery] Guid id)
    {
        var response = await mediator.Send(new GetPostByIdRequest() { PostId = id });
        return Ok(response);
    }

    //get by team id
    [HttpGet]
    public async Task<IActionResult> GetPostsByTeamId([FromQuery] Guid id)
    {
        var response = await mediator.Send(new GetPostsByTeamIdRequest() { TeamId = id });
        return Ok(response);
    }

    //create
    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }


    [HttpPost]
    public async Task<IActionResult> LikePost([FromBody] LikePostCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }
    //update    
    [HttpPut]
    public async Task<IActionResult> UpdatePost([FromBody] UpdatePostCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }

    //delete    
    [HttpDelete]
    public async Task<IActionResult> DeletePost([FromQuery] DeletePostCommandRequest request)
    {
        var response = await mediator.Send(request);
        return Ok(response);
    }



}
