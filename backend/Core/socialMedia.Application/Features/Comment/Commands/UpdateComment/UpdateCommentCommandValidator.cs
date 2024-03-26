using FluentValidation;

namespace socialMedia.Application;

public class UpdateCommentCommandValidator : AbstractValidator<UpdateCommentCommandRequest>
{
    public UpdateCommentCommandValidator()
    {

        RuleFor(x => x.Description).NotEmpty().WithName("Description");
    }
}