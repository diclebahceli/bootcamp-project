namespace socialMedia.Application;

public class EmailOrPasswordShouldBeValidException : BaseException
{
    public EmailOrPasswordShouldBeValidException() : base("There is no such an email") { }


}