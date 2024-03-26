using socialMedia.Domain;

namespace socialMedia.Application;

public class GetAllPostsQueryResponse
{
    public ICollection<PostDto> Posts { get; set; } = new List<PostDto>();

}
