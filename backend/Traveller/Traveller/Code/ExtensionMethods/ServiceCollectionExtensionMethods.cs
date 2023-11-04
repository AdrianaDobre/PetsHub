using BusinessLogic.Base;
using BusinessLogic.Implementation;
using BusinessLogic.Implementation.UserAccount;
using Common.DTOs;
using System.Security.Claims;
using PetsHub.Code.Base;

namespace PetsHub.Code.ExtensionMethods
{
    public static class ServiceCollectionExtensionMethods
    {
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            services.AddScoped<ControllerDependencies>();

            return services;
        }

        public static IServiceCollection AddPetsHubBusinessLogic(this IServiceCollection services)
        {
            services.AddScoped<ServiceDependencies>();
            services.AddScoped<BaseService>();
            services.AddScoped<UserService>();

            return services;
        }

        public static IServiceCollection AddPetsHubCurrentUser(this IServiceCollection services)
        {
            services.AddScoped(s =>
            {
                var accessor = s.GetService<IHttpContextAccessor>();
                var httpContext = accessor.HttpContext;
                var claims = httpContext.User.Claims;

                var userIdClaim = claims?.FirstOrDefault(c => c.Type == "Id")?.Value;
                var isParsingSuccessful = Guid.TryParse(userIdClaim, out Guid id);

                return new CurrentUserDTO
                {
                    Id = id,
                    IsAuthenticated = httpContext.User.Identity.IsAuthenticated,
                    Email = claims?.FirstOrDefault(c => c.Type == "Email")?.Value,
                    PhoneNumber = claims?.FirstOrDefault(c => c.Type == "PhoneNumber")?.Value,
                    Name = claims?.FirstOrDefault(c => c.Type == "Name")?.Value,
                    //PhotoId = claims?.FirstOrDefault(c => c.Type == "PhotoId")?.Value,
                    //PhotoPath = claims.FirstOrDefault(c => c.Type == "PhotoPath")?.Value

                };
            });

            return services;
        }
    }
}
