namespace socialMedia.Application;

public class InvalidEmailOrPasswordException : BaseException
{
    public InvalidEmailOrPasswordException() : base("Wrong email or password") { }

}
