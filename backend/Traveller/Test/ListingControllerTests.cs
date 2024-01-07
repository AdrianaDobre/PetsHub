//using AutoMapper;
//using BusinessLogic.Base;
//using BusinessLogic.Implementation.ListingImp;
//using BusinessLogic.Implementation.ListingImp.Models;
//using BusinessLogic.Implementation.UserAccount;
//using BusinessLogic.Implementation.UserAccount.Models;
//using Castle.Core.Configuration;
//using Common.DTOs;
//using DataAccess.Context;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Configuration;
//using PetsHub.Code.Base;
//using PetsHub.Controllers;
//using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

//namespace Test
//{
//    public class ListingControllerTests
//    {

//        [Fact]
//        public async Task AddPlace_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();
//            mockListingService.Setup(x => x.AddPlaceForHosting(It.IsAny<AddListingModel>())).Returns(Task.CompletedTask);

//            var model = new AddListingModel() { };

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.AddPlace(model);

//            // Assert
//            Assert.IsType<OkResult>(result);
//        }

//        [Fact]
//        public async Task AddPlace_WhenListingModelIsNull_ThrowsException()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();
//            mockListingService.Setup(x => x.AddPlaceForHosting(It.IsAny<AddListingModel>())).Returns(Task.CompletedTask);

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act & Assert
//            await Assert.ThrowsAsync<ArgumentNullException>(async () => await controller.AddPlace(null));
//        }

//        [Fact]
//        public async Task GetOffers_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();
//            mockListingService.Setup(x => x.GetAllOffers()).ReturnsAsync(new List<OfferModel>());

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.GetOffers();

//            // Assert
//            Assert.IsType<OkObjectResult>(result);
//        }

//        [Fact]
//        public async Task SendRequestToHost_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();

//            var Id = Guid.Parse("1203d8a6-114a-48ab-8d6e-30bed4671525");

//            mockListingService.Setup(x => x.SendRequestToAHost(It.IsAny<Guid>())).Returns(Task.CompletedTask);

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.SendRequestToHost(Id);

//            // Assert
//            Assert.IsType<OkResult>(result);
//        }

//        [Fact]
//        public async Task AcceptOrRejectRequest_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();

//            var Id = Guid.Parse("1203d8a6-114a-48ab-8d6e-30bed4671525");

//            mockListingService.Setup(x => x.AcceptOrRejectRequest(It.IsAny<Guid>(), It.IsAny<bool>())).Returns(Task.CompletedTask);

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.AcceptOrRejectRequest(Id, true);

//            // Assert
//            Assert.IsType<OkResult>(result);
//        }

//        [Fact]
//        public async Task GetRequestsReceived_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();
//            mockListingService.Setup(x => x.GetAllRequestsReceived()).ReturnsAsync(new List<RequestModel>());

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.GetRequestsReceived();

//            // Assert
//            Assert.IsType<OkObjectResult>(result);
//        }

//        [Fact]
//        public async Task GetHistoryOfPets_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();
//            mockListingService.Setup(x => x.GetHistoryOfPets()).ReturnsAsync(new List<PetWithOwnerModel>());

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.GetHistoryOfPets();

//            // Assert
//            Assert.IsType<OkObjectResult>(result);
//        }

//        [Fact]
//        public async Task GetHistoryOfPetSitters_WhenCalled_ReturnsOk()
//        {
//            //Arrange
//            var mockCurrentUserDTO = new Mock<CurrentUserDTO>();
//            var mockDependencies = new Mock<ControllerDependencies>(mockCurrentUserDTO.Object);
//            var mockConfiguration = new Mock<IConfiguration>();
//            var mockUserService = new Mock<UserServiceInterface>();
//            var mockListingService = new Mock<ListingServiceInterface>();
//            mockListingService.Setup(x => x.GetHistoryOfPetSitters()).ReturnsAsync(new List<PetSitterWithPetModel>());

//            var controller = new ListingController(mockDependencies.Object, mockUserService.Object, mockListingService.Object, mockConfiguration.Object);

//            // Act
//            var result = await controller.GetHistoryOfPetSitters();

//            // Assert
//            Assert.IsType<OkObjectResult>(result);
//        }
//    }
//}