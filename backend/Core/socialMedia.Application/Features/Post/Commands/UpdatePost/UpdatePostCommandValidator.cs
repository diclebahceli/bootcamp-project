using FluentValidation;

namespace socialMedia.Application;

public class UpdatePostCommandValidator : AbstractValidator<UpdatePostCommandRequest>
{
    public UpdatePostCommandValidator()
    {

        RuleFor(x => x.Description).NotEmpty().WithName("Description");
    }
}