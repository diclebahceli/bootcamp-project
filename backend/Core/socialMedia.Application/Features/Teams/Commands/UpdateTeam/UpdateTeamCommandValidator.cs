using FluentValidation;

namespace socialMedia.Application;

public class UpdateTeamCommandValidator : AbstractValidator<UpdateTeamCommandRequest>
{
    public UpdateTeamCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().WithName("Title");
        RuleFor(x => x.Description).NotEmpty().WithName("Description");
        RuleFor(x => x.Image).NotEmpty();
    }
}
