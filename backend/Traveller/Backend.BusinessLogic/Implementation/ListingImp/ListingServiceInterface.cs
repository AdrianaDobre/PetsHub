using BusinessLogic.Implementation.ListingImp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.ListingImp
{
    public interface ListingServiceInterface
    {
        Task AddPlaceForHosting(AddListingModel model);
        Task<List<OfferModel>> GetAllOffers();
        Task SendRequestToAHost(Guid listingId);
        Task AcceptOrRejectRequest(Guid listingId, bool accepted);
        Task<List<RequestModel>> GetAllRequestsReceived();
        Task<List<PetWithOwnerModel>> GetHistoryOfPets();
        Task<List<PetSitterWithPetModel>> GetHistoryOfPetSitters();
    }
}
