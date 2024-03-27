namespace socialMedia.Application;

public class GetPostByIdResponse
{
    public PostDto Post { get; set; }
    public ICollection<CommentDto> Comments { get; set; }
    public ICollection<LikeDto> Likes { get; set; }

}
