using BusinessLogic.Base;
using Common.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Common.DTOs;
using Common.ValidationExtensions;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using BusinessLogic.Implementation.ListingImp.Models;
using AutoMapper;
using Entities.Enums;

namespace BusinessLogic.Implementation.ListingImp
{
    public class ListingService : BaseService, ListingServiceInterface
    {
        public ListingService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public async Task AddPlaceForHosting(AddListingModel model)
        {
            var listing = new Listing()
            {
                Id = Guid.NewGuid(),
                CreatorUserId = CurrentUser.Id,
                AcceptedUserId = null,
                PetId = (short)model.PetId,
                Description = model.Description,
                Status = (short)StatusTypes.Posted,
                PetPhotoId = null,
                //Date = model.Date,
                Date = DateTime.Now,
                Price = model.Price,
                Time = model.Time,
                Type = false,
                Title = model.Title
            };

            UnitOfWork.Listings.Insert(listing);

            await UnitOfWork.SaveChangesAsync();
        }

        public async Task<List<OfferModel>> GetAllOffers()
        {
            return await Mapper.ProjectTo<OfferModel>(UnitOfWork.Listings.Get()
                .Include(l => l.CreatorUser)
                .Include(l => l.Pet)
                .Where(l => l.Type == false && l.Status == (short)StatusTypes.Posted && l.CreatorUserId != CurrentUser.Id))
                .OrderBy(l => l.Date)
                .ToListAsync();
        }

        public async Task SendRequestToAHost(Guid listingId)
        {
            var listing = await UnitOfWork.Listings.Get().FirstOrDefaultAsync(l => l.Id == listingId);

            if (listing == null)
            {
                throw new NotFoundErrorException();
            }

            if (listing.Status != (short)StatusTypes.Posted)
            {
                throw new Exception("The offer is no longer valid.");
            }

            listing.Status = (short)StatusTypes.RequestSent;
            listing.AcceptedUserId = CurrentUser.Id;
            
            UnitOfWork.Listings.Update(listing);

            await UnitOfWork.SaveChangesAsync();
        }

        public async Task AcceptOrRejectRequest(Guid listingId, bool accepted)
        {
            var listing = await UnitOfWork.Listings.Get().FirstOrDefaultAsync(l => l.Id == listingId);

            if (listing == null)
            {
                throw new NotFoundErrorException();
            }

            if (listing.Status != (short)StatusTypes.RequestSent)
            {
                throw new Exception("The offer is no longer valid.");
            }

            listing.Status = accepted? (short)StatusTypes.RequestAccepted : (short)StatusTypes.RequestRejected;

            UnitOfWork.Listings.Update(listing);

            await UnitOfWork.SaveChangesAsync();
        }

        public async Task<List<RequestModel>> GetAllRequestsReceived()
        {
            return await Mapper.ProjectTo<RequestModel>(UnitOfWork.Listings.Get()
                .Include(l => l.AcceptedUser)
                .Include(l => l.Pet)
                .Where(l => l.Type == false && l.Status != (short)StatusTypes.Posted && l.CreatorUserId == CurrentUser.Id))
                .ToListAsync();
        }

        public async Task<List<PetWithOwnerModel>> GetHistoryOfPets()
        {
            return await Mapper.ProjectTo<PetWithOwnerModel>(UnitOfWork.Listings.Get()
                .Include(l => l.AcceptedUser)
                .Include(l => l.Pet)
                .Include(l => l.PetPhoto)
                .Where(l => l.Type == false && l.Status == (short)StatusTypes.RequestAccepted && l.CreatorUserId == CurrentUser.Id))
                .ToListAsync();
        }

        public async Task<List<PetSitterWithPetModel>> GetHistoryOfPetSitters()
        {
            return await Mapper.ProjectTo<PetSitterWithPetModel>(UnitOfWork.Listings.Get()
                .Include(l => l.CreatorUser)
                .Include(l => l.Pet)
                .Include(l => l.PetPhoto)
                .Where(l => l.Type == false && l.Status == (short)StatusTypes.RequestAccepted && l.AcceptedUserId == CurrentUser.Id))
                .ToListAsync();
        }
    }
}
