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
using BusinessLogic.Implementation.ListingImp.Models;
using BusinessLogic.Implementation.ListingImp;

namespace PetsHub.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ListingController : BaseController
    {
        private readonly UserService userService;
        private readonly ListingService listingService;
        private readonly IConfiguration _configuration;

        public ListingController(ControllerDependencies dependencies, UserService userService, ListingService listingService, IConfiguration configuration) : base(dependencies)
        {
            this.userService = userService;
            this.listingService = listingService;
            _configuration = configuration;
        }

        [HttpPost("addPlace")]
        [Authorize]
        public async Task<IActionResult> AddPlace([FromBody] AddListingModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("model");
            }

            await listingService.AddPlaceForHosting(model);

            return Ok();
        }
    }
}
