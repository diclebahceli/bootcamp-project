using FluentValidation;

namespace socialMedia.Application;

public class DeleteTeamCommandValidator : AbstractValidator<DeleteTeamCommandRequest>
{
    public DeleteTeamCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }

}
