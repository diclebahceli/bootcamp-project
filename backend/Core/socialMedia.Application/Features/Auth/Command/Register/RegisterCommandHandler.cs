﻿using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using socialMedia.Domain;

namespace socialMedia.Application;

public class RegisterCommandHandler : BaseHandler, IRequestHandler<RegisterCommandRequest, Unit>
{
    private readonly AuthRules authRules;
    private readonly UserManager<User> userManager;
    private readonly RoleManager<Role> roleManager;

    public RegisterCommandHandler(AuthRules authRules,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IMapper mapper, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.authRules = authRules;
        this.userManager = userManager;
        this.roleManager = roleManager;
    }

    public async Task<Unit> Handle(RegisterCommandRequest request, CancellationToken cancellationToken)
    {
        await authRules.UserShouldNotExists(await userManager.FindByEmailAsync(request.Email));
        User user = mapper.Map<User, RegisterCommandRequest>(request);
        user.UserName = request.Email;
        user.SecurityStamp = Guid.NewGuid().ToString();
        IdentityResult result = await userManager.CreateAsync(user, request.Password);
        if (result.Succeeded)
        {
            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = Guid.NewGuid().ToString()

                });
                await userManager.AddToRoleAsync(user, "User");
            }
        }
        return Unit.Value;
    }
}

