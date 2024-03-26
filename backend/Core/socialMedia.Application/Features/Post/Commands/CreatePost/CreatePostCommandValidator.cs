using FluentValidation;

namespace socialMedia.Application;

public class CreatePostCommandValidator : AbstractValidator<CreateTeamCommandRequest>
{
    public CreatePostCommandValidator()
    {
        RuleFor(x => x.Description)
           .NotEmpty();
    }
}
