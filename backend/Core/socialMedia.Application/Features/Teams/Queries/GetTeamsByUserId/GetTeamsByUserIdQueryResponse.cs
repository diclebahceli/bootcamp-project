namespace socialMedia.Application;

public class GetTeamsByUserIdQueryResponse
{
    public ICollection<TeamDto> Teams { get; set; } = new List<TeamDto>();
}
