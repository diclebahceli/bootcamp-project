using Microsoft.Extensions.DependencyInjection;
using socialMedia.Application;

namespace socialMedia.Mapper;

public static class Registration
{
    public static void AddCustomMapper(this IServiceCollection services)
    {
        services.AddSingleton<IMapper, Mapper>();
    }
}
