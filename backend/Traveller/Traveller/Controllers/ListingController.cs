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
        //private readonly UserServiceInterface userService;
        //private readonly ListingServiceInterface listingService;
        private readonly UserService userService;
        private readonly ListingService listingService;

        public ListingController(ControllerDependencies dependencies, UserService userService, ListingService listingService, IConfiguration configuration) : base(dependencies)
        {
            this.userService = userService;
            this.listingService = listingService;
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

        [HttpGet("listOffers")]
        [Authorize]
        public async Task<IActionResult> GetOffers()
        {
            var offers = await listingService.GetAllOffers();

            return Ok(offers);
        }

        [HttpPut("sendRequestToHost")]
        [Authorize]
        public async Task<IActionResult> SendRequestToHost(Guid listingId)
        {
            await listingService.SendRequestToAHost(listingId);

            return Ok();
        }

        [HttpPut("acceptOrRejectRequest")]
        [Authorize]
        public async Task<IActionResult> AcceptOrRejectRequest(Guid listingId, bool accepted)
        {
            await listingService.AcceptOrRejectRequest(listingId, accepted);

            return Ok();
        }

        [HttpGet("viewRequestsReceived")]
        [Authorize]
        public async Task<IActionResult> GetRequestsReceived()
        {
            var requests = await listingService.GetAllRequestsReceived();

            return Ok(requests);
        }

        [HttpGet("historyOfPets")]
        [Authorize]
        public async Task<IActionResult> GetHistoryOfPets()
        {
            var pets = await listingService.GetHistoryOfPets();

            return Ok(pets);
        }

        [HttpGet("historyOfPetSitters")]
        [Authorize]
        public async Task<IActionResult> GetHistoryOfPetSitters()
        {
            var petSitters = await listingService.GetHistoryOfPetSitters();

            return Ok(petSitters);
        }
    }
}
