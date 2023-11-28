using AutoMapper;
using Common.DTOs;
using DataAccess;

namespace BusinessLogic.Base
{
    public class ServiceDependencies
    {
        public IMapper Mapper { get; set; }
        public UnitOfWork UnitOfWork { get; set; }
        public CurrentUserDTO CurrentUser { get; set; }

        public ServiceDependencies(IMapper mapper, UnitOfWork unitOfWork, CurrentUserDTO currentUser)
        {
            Mapper = mapper;
            UnitOfWork = unitOfWork;
            CurrentUser = currentUser;
        }
    }
}
