using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace socialMedia.Application;

public static class Registration
{
    public static void AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();
        // Register all services from the executing ( current ) assembly
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assembly));
        services.AddValidatorsFromAssembly(assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(FluentValidationBehaviour<,>));
        RegisterRules(services, assembly);
    }

    private static void RegisterRules(IServiceCollection services, Assembly assembly)
    {
        var types = assembly.GetTypes().Where(t => t.BaseType == typeof(BaseRules));
        foreach (var type in types)
        {
            services.AddTransient(type);
        }


    }
}
