using BusinessLogic.Base;
using BusinessLogic.Implementation.UserAccount.Models;
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

namespace BusinessLogic.Implementation.ListingImp
{
    public class ListingService : BaseService
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
                PetId = model.PetId,
                Description = model.Description,
                Status = null,
                PetPhotoId = null,
                Date = model.Date,
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
            return await Mapper.ProjectTo<OfferModel>(UnitOfWork.Listings.Get().Include(l => l.CreatorUser).Include(l => l.Pet)).ToListAsync();
        }
    }
}
