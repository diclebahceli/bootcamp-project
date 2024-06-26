﻿using System.Data;
using FluentValidation;

namespace socialMedia.Application;

public class RegisterCommandValidator : AbstractValidator<RegisterCommandRequest>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(50).MinimumLength(3).WithName("Full Name");
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(60).MinimumLength(8).WithName("Email");
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6).WithName("Password");
    }
}
