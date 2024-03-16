using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using socialMedia.Application;

namespace socialMedia.Persistence;

public static class Registration
{
    public static void AddPersistance(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("LiteConnection"));
        });

        services.AddScoped(typeof(IWriteRepository<>), typeof(WriteRepository<>));
        services.AddScoped(typeof(IReadRepository<>), typeof(ReadRepository<>));
    }

}
