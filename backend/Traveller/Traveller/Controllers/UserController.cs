using BusinessLogic.Implementation.UserAccount;
using BusinessLogic.Implementation.UserAccount.Models;
using Common.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PetsHub.Code.Base;
using PetsHub.Code.Utils;
using BusinessLogic.Implementation.ListingImp;

namespace PetsHub.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UserController : BaseController
    {
        private readonly UserService userService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient Client;
        public UserController(ControllerDependencies dependencies, UserService userService, IConfiguration configuration, HttpClient client) : base(dependencies)
        {
            this.userService = userService;
            _configuration = configuration;
            Client = client;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("model");
            }
            model.Email?.Trim();

            await userService.RegisterNewUser(model);

            return Ok();
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login([FromBody] LogInModel model)
        {
            var user = await userService.Login(model);

            if (!user.IsAuthenticated)
            {
                model.AreCredentialsInvalid = true;
                return Unauthorized();
            }

            var token = LogIn(user);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                email = user.Email,
                phoneNumber = user.PhoneNumber,
            });
        }

        private JwtSecurityToken LogIn(CurrentUserDTO user)
        {
            var authClaims = new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("PhoneNumber", user.PhoneNumber),
                    new Claim("Name", user.Name),
                    //new Claim("Photo", user.Photo),
                    new Claim("Id", user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //new Claim(ClaimTypes.Role, user.Role),
                };

            var token = GetToken(authClaims);

            return token;
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(24),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        [HttpGet("listOfPetSittersOnTheMap")]
        [Authorize]
        public async Task<IActionResult> GetPetSitters()
        {
            var petSitters = await userService.GetAllPetSitters();

            return Ok(petSitters);
        }

        [HttpGet("userProfileAuth")]
        [Authorize]
        public async Task<IActionResult> GetAuthUserProfile()
        {
            var userProfile = await userService.GetUserProfile();

            return Ok(userProfile);
        }

        [HttpPut("editUserProfile")]
        [Authorize]
        public async Task<IActionResult> EditUserProfile([FromBody] EditProfileModel editUser)
        {
            if (editUser == null)
            {
                throw new ArgumentNullException("model");
            }

            await userService.EditUserProfile(editUser);

            return Ok();
        }

        [HttpGet("petSitterProfile/{id}")]
        [Authorize]
        public async Task<IActionResult> GetPetSitterProfile([FromRoute] Guid id)
        {
            var userProfile = await userService.GetPetSitterProfileById(id);

            return Ok(userProfile);
        }
    }
}
