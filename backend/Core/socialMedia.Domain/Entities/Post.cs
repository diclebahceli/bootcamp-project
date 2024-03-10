namespace socialMedia.Domain;

public class Post : EntityBase
{
    public string Description { get; set; } = null!;
    public string? Image { get; set; }
    public int GroupId { get; set; }
    public Team Team { get; set; } = null!;
    public int TeamsId { get; set; }
    public ICollection<Comment>? Comments { get; set; }


    public Post()
    {
    }

    public Post(string description, string image, DateTime createdDate, int groupId)
    {
        Description = description;
        Image = image;
        CreatedDate = createdDate;
        GroupId = groupId;
    }

}
