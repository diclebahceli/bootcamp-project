using FluentValidation;

namespace socialMedia.Application;

public class DeletePostCommandValidator : AbstractValidator<DeletePostCommandRequest>
{
    public DeletePostCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
