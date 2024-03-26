using FluentValidation;

namespace socialMedia.Application;

public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommandRequest>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(x => x.Description)
           .NotEmpty();

        RuleFor(x => x.PostId)
            .NotEmpty();

        RuleFor(x => x.UserId)
            .NotEmpty();

    }
}