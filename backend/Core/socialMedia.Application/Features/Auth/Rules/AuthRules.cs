using socialMedia.Domain;

namespace socialMedia.Application;

public class AuthRules : BaseRules
{

    public Task UserShouldNotExists(User? user)
    {
        if (user is not null)
            throw new UserAlreadyExistsException();
        return Task.CompletedTask;

    }

}
