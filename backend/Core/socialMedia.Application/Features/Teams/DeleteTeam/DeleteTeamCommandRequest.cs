using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class DeleteTeamCommandRequest : IRequest
{
    public int Id { get; set; }

}