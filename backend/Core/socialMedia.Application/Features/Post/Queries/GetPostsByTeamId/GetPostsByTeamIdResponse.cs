using MediatR.NotificationPublishers;

namespace socialMedia.Application;

public class GetPostsByTeamIdResponse
{
    public ICollection<PostDto> Posts { get; set; } = new List<PostDto>();
    

}
