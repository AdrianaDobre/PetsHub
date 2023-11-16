using AutoMapper;
using BusinessLogic.Implementation.ListingImp.Models;
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
                    .ForMember(a => a.CreatorName, a => a.MapFrom(s => s.CreatorUser.Name))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1));

            CreateMap<Listing, RequestModel>()
                    .ForMember(a => a.AcceptedUserName, a => a.MapFrom(s => s.AcceptedUser.Name))
                    .ForMember(a => a.PetType, a => a.MapFrom(s => s.Pet.Pet1));
        }
    }
}
