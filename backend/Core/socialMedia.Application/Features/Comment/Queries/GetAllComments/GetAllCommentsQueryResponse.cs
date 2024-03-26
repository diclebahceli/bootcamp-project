namespace socialMedia.Application;

public class GetAllCommentsQueryResponse
{
    public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
}
