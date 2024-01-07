using AutoMapper;
using BusinessLogic.Implementation.ListingImp.Models;
using BusinessLogic.Implementation.UserAccount.Models;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.ListingImp.Mappings
{
    public class ListingProfile : Profile
    {
        public ListingProfile() 
        {
            CreateMap<Listing, OfferModel>()
                    .ForMember(a => a.PhoneNumber, a => a.MapFrom(s => s.CreatorUser.PhoneNumber))
                    .ForMember(a => a.CreatorName, a => a.MapFrom(s => s.CreatorUser.Name))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1));

            CreateMap<Listing, RequestModel>()
                    .ForMember(a => a.PhoneNumber, a=> a.MapFrom(s => s.AcceptedUser.PhoneNumber))
                    .ForMember(a => a.Status, a => a.MapFrom(s => s.Status))
                    .ForMember(a => a.AcceptedUserName, a => a.MapFrom(s => s.AcceptedUser.Name))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1));

            CreateMap<Listing, PetWithOwnerModel>()
                    .ForMember(a => a.OwnerId, a => a.MapFrom(s => s.AcceptedUser.Id))
                    .ForMember(a => a.OwnerName, a => a.MapFrom(s => s.AcceptedUser.Name))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1))
                    .ForMember(a => a.PetPhotoPath, a => a.MapFrom(s => s.PetPhoto != null? s.PetPhoto.Path : null));

            CreateMap<Listing, PetSitterWithPetModel>()
                    .ForMember(a => a.PetSitterId, a => a.MapFrom(s => s.CreatorUser.Id))
                    .ForMember(a => a.PetSitterName, a => a.MapFrom(s => s.CreatorUser.Name))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1))
                    .ForMember(a => a.PetPhotoPath, a => a.MapFrom(s => s.PetPhoto != null ? s.PetPhoto.Path : null));


            CreateMap<Listing, PetSitterDetailsModel>()
                    .ForMember(a => a.Id, a => a.MapFrom(s => s.CreatorUser.Id))
                    .ForMember(a => a.PhoneNumber, a => a.MapFrom(s => s.CreatorUser.PhoneNumber))
                    .ForMember(a => a.ListingId, a => a.MapFrom(s => s.Id))
                    .ForMember(a => a.Name, a => a.MapFrom(s => s.CreatorUser.Name))
                    .ForMember(a => a.LocationName, a => a.MapFrom(s => s.CreatorUser.LocationName))
                    .ForMember(a => a.LocationLatitude, a => a.MapFrom(s => s.CreatorUser.LocationLatitude))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1))
                    .ForMember(a => a.LocationLongitude, a => a.MapFrom(s => s.CreatorUser.LocationLongitude));
        }
    }
}
