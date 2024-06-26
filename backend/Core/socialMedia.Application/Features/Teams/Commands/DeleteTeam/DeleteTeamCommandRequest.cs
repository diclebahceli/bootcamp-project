﻿using MediatR;
using socialMedia.Domain;

namespace socialMedia.Application;

public class DeleteTeamCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }

}