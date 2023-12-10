

using AutoMapper;
using BusinessLogic.Base;
using BusinessLogic.Implementation.UserAccount;
using BusinessLogic.Implementation.UserAccount.Models;
using Common.DTOs;
using DataAccess.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PetsHub.Code.Base;
using PetsHub.Controllers;

namespace Test
{
    public class SignUpTests
    {

        [Fact]
        public void Register_WhenCalled_ReturnsOk()
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
            var mockService = new Mock<UserService>(mockServiceDependencies.Object);
            mockService.Setup(x => x.RegisterNewUser(It.IsAny<RegisterModel>())).Returns(It.IsAny<Task>());

            var model = new RegisterModel()
            {
                Name = "Test",
                Email = "test@email.com",
                PhoneNumber = "0777777777",
                Password = "test",
                ConfirmedPassword = "test"
            };

            var controller = new UserController(mockDependencies.Object, mockService.Object, mockConfiguration.Object, mockClient.Object);

            // Act
            var result = controller.Register(model);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
        public void Login_WhenCalled_ReturnsOk()
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
            var mockService = new Mock<UserService>(mockServiceDependencies.Object);
            mockService.Setup(x => x.Login(It.IsAny<LogInModel>())).Returns(It.IsAny<Task<CurrentUserDTO>>());

            var model = new LogInModel()
            {
                Email = "test@email.com",
                Password = "test"
            };
            // Act

            // Assert
        }
    }
}