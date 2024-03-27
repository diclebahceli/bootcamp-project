namespace socialMedia.Application;

public class GetTeamByIdResponse
{
    public TeamDto Team { get; set; }
    public ICollection<UserDto> Users { get; set; }
    public ICollection<PostDto> Posts { get; set; }
}
