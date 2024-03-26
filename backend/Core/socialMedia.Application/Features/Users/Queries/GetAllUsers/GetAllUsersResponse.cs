using socialMedia.Domain;

namespace socialMedia.Application.Features;
public class GetAllUsersResponse
{
    public ICollection<UserDto> Users { get; set; } = new List<UserDto>();

}
