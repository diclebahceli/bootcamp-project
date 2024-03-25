using Microsoft.AspNetCore.Identity;

namespace socialMedia.Domain;

public class User : IdentityUser<Guid>
{

    public ICollection<Team> Teams { get; set; }
    public ICollection<Post> Posts { get; set; }
    public ICollection<Comment> Comments { get; set; }

    public ICollection<Like> Likes { get; set; }

    public string FullName { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }


    public User()
    {
        Teams = new List<Team>();
        Posts = new List<Post>();
        Comments = new List<Comment>();
        Likes = new List<Like>();
    }
    public User(string fullName)
    {

        FullName = fullName;
        Teams = new List<Team>();
        Posts = new List<Post>();
        Comments = new List<Comment>();
        Likes = new List<Like>();

    }


}
