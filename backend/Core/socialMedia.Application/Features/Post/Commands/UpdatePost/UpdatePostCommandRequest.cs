﻿using MediatR;

namespace socialMedia.Application;

public class UpdatePostCommandRequest : IRequest<UpdatePostCommandResponse>
{

    public Guid Id { get; set; }
    public string Description { get; set; } = null!;
}
