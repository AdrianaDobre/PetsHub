using AutoMapper;
using BusinessLogic.Implementation.ListingImp.Models;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile() {
            CreateMap<User, Models.UserProfileModel>()
                   .ForMember(a => a.PhotoPath, a => a.MapFrom(s => s.Photo!=null ? s.Photo.Path : null));
        }
    }
}
