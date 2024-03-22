using FluentValidation;

namespace socialMedia.Application;

public class CreateTeamCommandValidator : AbstractValidator<CreateTeamCommandRequest>
{
    public CreateTeamCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().WithName("Title");
        RuleFor(x => x.Description).NotEmpty().WithName("Description");
        RuleFor(x => x.Image).NotEmpty();
    }

}