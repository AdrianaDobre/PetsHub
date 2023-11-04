using Common.DTOs;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace PetsHub.Code.Utils
{
    public class AuthenticationUtils
    {
        public async Task LogIn(CurrentUserDTO user, HttpContext httpContext)
        {
            var claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                //new Claim(ClaimTypes.Name, $"{user.Name}"),
                //new Claim("UserName", $"{user.Username}"),
                new Claim(ClaimTypes.Email, user.Email),
            };

            //user.Roles.ForEach(role => claims.Add(new Claim(ClaimTypes.Role, role)));

            var identity = new ClaimsIdentity(claims, "Cookies");
            var principal = new ClaimsPrincipal(identity);

            await httpContext.SignInAsync(
                    scheme: "BackendCookies",
                    principal: principal);
        }

        public async Task LogOut(HttpContext httpContext)
        {
            await httpContext.SignOutAsync(scheme: "BackendCookies");
        }
    }
}
