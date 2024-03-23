using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using socialMedia.Domain;

namespace socialMedia.Application;

public class LoginCommandHandler : BaseHandler, IRequestHandler<LoginCommandRequest, LoginCommandResponse>
{
    private readonly UserManager<User> userManager;
    private readonly ITokenService tokenService;
    private readonly AuthRules authRules;
    private readonly IConfiguration configuration;

    public LoginCommandHandler(UserManager<User> userManager,
     ITokenService tokenService,
    AuthRules authRules, IMapper mapper, IUnitOfWork unitOfWork,
    IConfiguration configuration,
    IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.userManager = userManager;
        this.tokenService = tokenService;
        this.authRules = authRules;
        this.configuration = configuration;
    }
    public async Task<LoginCommandResponse> Handle(LoginCommandRequest request, CancellationToken cancellationToken)
    {
        User user = await userManager.FindByEmailAsync(request.Email);
        bool checkPassword = await userManager.CheckPasswordAsync(user, request.Password);

        await authRules.EmailOrPasswordShouldNotBeInvalid(user, checkPassword);
        IList<string> roles = await userManager.GetRolesAsync(user);
        JwtSecurityToken token = await tokenService.CreateToken(user, roles);
        string refreshToken = tokenService.GenerateRefreshToken();

        _ = int.TryParse(configuration["JWT:RefreshTokenValidityInDays"], out int RefreshTokenValidityInDays);
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(RefreshTokenValidityInDays);

        await userManager.UpdateAsync(user);
        await userManager.UpdateSecurityStampAsync(user);

        string _token = new JwtSecurityTokenHandler().WriteToken(token);

        await userManager.SetAuthenticationTokenAsync(user, "Default", "AccessToken", _token);

        return new()
        {
            Token = _token,
            RefreshToken = refreshToken,
            Expiration = token.ValidTo
        };
    }
}
