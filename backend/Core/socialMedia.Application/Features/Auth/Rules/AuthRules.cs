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

    public Task EmailOrPasswordShouldNotBeInvalid(User? user, bool checkPassword)
    {
        if (user is null || !checkPassword)
            throw new InvalidEmailOrPasswordException();
        return Task.CompletedTask;
    }


    public Task RefreshTokenShouldNotExpired(DateTime? expirationDate)
    {
        if (expirationDate <= DateTime.UtcNow)
            throw new RefreshTokenShouldNotExpiredException();
        return Task.CompletedTask;
    }

    public Task EmailOrPasswordShouldBeValid(User? user)
    {
        if (user is null)
            throw new EmailOrPasswordShouldBeValidException();
        return Task.CompletedTask;
    }
}
