using AutoMapper;
using BusinessLogic.Base;
using BusinessLogic.Implementation.UserAccount;
using BusinessLogic.Implementation.UserAccount.Models;
using Castle.Core.Configuration;
using Common.DTOs;
using DataAccess.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PetsHub.Code.Base;
using PetsHub.Controllers;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace Test
{
    public class UserControllerTests
    {
        [Fact]
        public async Task Register_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();
            mockUserService.Setup(x => x.RegisterNewUser(It.IsAny<RegisterModel>())).Returns(Task.CompletedTask);

            var model = new RegisterModel()
            {
                Name = "Test",
                Email = "test@email.com",
                PhoneNumber = "0777777777",
                Password = "test",
                ConfirmedPassword = "test"
            };

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.Register(model);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Register_WhenCalledWithNullModel_ThrowsException()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();
            mockUserService.Setup(x => x.RegisterNewUser(It.IsAny<RegisterModel>())).Returns(Task.CompletedTask);

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () => await controller.Register(null));

        }

        [Fact]
        public async Task Login_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.Setup(x => x["JWT:Secret"]).Returns("JWTAuthenticationHIGHsecuredPasswordVVVp1OH7Xzyr"); // Set up the configuration behavior
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();
            mockUserService.Setup(x => x.Login(It.IsAny<LogInModel>())).ReturnsAsync(new CurrentUserDTO {Email = "test@email.com", PhoneNumber = "0777777777", Name = "test", Id = Guid.NewGuid(), IsAuthenticated = true});

            var model = new LogInModel()
            {
                Email = "test@email.com",
                Password = "test"
            };

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);
            
            // Act
            var result = await controller.Login(model);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task Login_WhenCalledWithWrongCredentials_ReturnsUnauthorized()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.Setup(x => x["JWT:Secret"]).Returns("JWTAuthenticationHIGHsecuredPasswordVVVp1OH7Xzyr"); // Set up the configuration behavior
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();
            mockUserService.Setup(x => x.Login(It.IsAny<LogInModel>())).ReturnsAsync(new CurrentUserDTO { Email = "test@email.com", PhoneNumber = "0777777777", Name = "test", Id = Guid.NewGuid(), IsAuthenticated = false });

            var model = new LogInModel()
            {
                Email = "test@email.com",
                Password = "test"
            };

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.Login(model);

            // Assert
            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public async Task GetPetSitters_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            var mockData = new List<PetSitterDetailsModel>() {};
            mockData.Add(new PetSitterDetailsModel()
            {
                Id = Guid.Parse("1203d8a6-114a-48ab-8d6e-30bed4671525"),
            });
            mockUserService.Setup(x => x.GetAllPetSitters())
                .ReturnsAsync(mockData); 

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.GetPetSitters();

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async Task GetAuthUserProfile_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            mockUserService.Setup(x => x.GetUserProfile()).ReturnsAsync(new UserProfileModel());

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.GetAuthUserProfile();

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task EditUserProfile_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            var model = new EditProfileModel()
            {
                Name = "test"
            };

            mockUserService.Setup(x => x.EditUserProfile(It.IsAny<EditProfileModel>())).Returns(Task.CompletedTask);

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.EditUserProfile(model);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task EditUserProfile_WhenUserIsNull_ThrowsException()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            mockUserService.Setup(x => x.EditUserProfile(It.IsAny<EditProfileModel>())).Returns(Task.CompletedTask);

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () => await controller.EditUserProfile(null));
        }

        [Fact]
        public async Task GetPetSitter_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            var Id = Guid.Parse("1203d8a6-114a-48ab-8d6e-30bed4671525");

            mockUserService.Setup(x => x.GetPetSitterProfileById(It.IsAny<Guid>())).ReturnsAsync(new PetSitterProfileModel() { });

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.GetPetSitterProfile(Id);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task addLocationOnUserProfile_WhenCalled_ReturnsOk()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            var model = new AddLocationForProfileModel() { };

            mockUserService.Setup(x => x.AddLocationOnUserProfile(It.IsAny<AddLocationForProfileModel>())).Returns(Task.CompletedTask);

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = await controller.addLocationOnUserProfile(model);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task addLocationOnUserProfile_WhenLocationModelIsNull_ThrowsException()
        {
            //Arrange
            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
            var mockConfiguration = new Mock<IConfiguration>();
            var mockClient = new Mock<HttpClient>();
            var mockMapper = new Mock<IMapper>();
            var mockContext = new Mock<PetsHubContext>();
            var mockUnit = new Mock<UnitOfWork>(mockContext.Object);
            var mockServiceDependencies = new Mock<ServiceDependencies>(mockMapper.Object, mockUnit.Object, mockCurrentUserDTO.Object);
            var mockUserService = new Mock<UserServiceInterface>();

            mockUserService.Setup(x => x.AddLocationOnUserProfile(It.IsAny<AddLocationForProfileModel>())).Returns(Task.CompletedTask);

            var controller = new UserController(mockDependencies.Object, mockUserService.Object, mockConfiguration.Object, mockClient.Object);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () => await controller.addLocationOnUserProfile(null));
        }
    }
}