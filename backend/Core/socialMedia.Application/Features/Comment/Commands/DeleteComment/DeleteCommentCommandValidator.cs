using FluentValidation;

namespace socialMedia.Application;

public class DeleteCommentCommandValidator : AbstractValidator<DeleteCommentCommandRequest>
{
    public DeleteCommentCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}