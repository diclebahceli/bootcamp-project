namespace socialMedia.Application;

public class RefreshTokenShouldNotExpiredException : BaseException
{
    public RefreshTokenShouldNotExpiredException() : base("Wrong email or password") { }


}