using Common.DTOs;

namespace PetsHub.Code.Base
{
    public class ControllerDependencies
    {
        public CurrentUserDTO CurrentUser { get; set; }

        public ControllerDependencies(CurrentUserDTO currentUser)
        {
            CurrentUser = currentUser;
        }
    }
}
