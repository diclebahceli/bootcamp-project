namespace socialMedia.Application;

public class GetAllTeamsQueryResponse
{
    public ICollection<TeamDto> Teams { get; set; } = new List<TeamDto>();
}