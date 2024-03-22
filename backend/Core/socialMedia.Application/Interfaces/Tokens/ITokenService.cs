using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using socialMedia.Domain;

namespace socialMedia.Application;

public interface ITokenService
{
    Task<JwtSecurityToken> CreateToken(User user, IList<string> roles);

    string GenerateRefreshToken();

    ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token );
}
