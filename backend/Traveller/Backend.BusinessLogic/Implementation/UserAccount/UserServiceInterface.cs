using BusinessLogic.Implementation.UserAccount.Models;
using Common.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount
{
    public interface UserServiceInterface
    {
        Task RegisterNewUser(RegisterModel model);
        Task<CurrentUserDTO> Login(LogInModel model);
        Task<List<PetSitterDetailsModel>> GetAllPetSitters();
        Task<UserProfileModel> GetUserProfile();
        Task EditUserProfile(EditProfileModel editUserProfile);
        Task<PetSitterProfileModel> GetPetSitterProfileById(Guid id);
        Task AddLocationOnUserProfile(AddLocationForProfileModel locationModel);
    }
}
