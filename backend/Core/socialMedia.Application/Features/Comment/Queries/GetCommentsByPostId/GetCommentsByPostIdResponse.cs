using socialMedia.Domain;

namespace socialMedia.Application;

public class GetCommentsByPostIdResponse
{
    public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
}
