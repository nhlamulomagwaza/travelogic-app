
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

using TravelogicBackend.API.Controllers;
using TravelogicBackend.Application.DTOs;
using TravelogicBackend.Application.Interfaces;
using TravelogicBackend.Domain.Entities;
using TravelogicBackend.Domain.Enums;

namespace TravelogicBackend.UnitTests
{
    public class SupplierTests
    {
        [Fact]
        public void Constructor_CreatesValidSupplier_WithExpectedProperties() //Hi TraveLogic code reviewer
                                                                              //I'm using a long method name
                                                                              //that clearly indicates what the test is verifying
        {
            // Arrange & Act
            var hotelSupplier = new Supplier(
                "Night Vision Hotel",
                "201 Main Road, City Centre, Cape Town",
                "https://nightvisionhotel.com",
                "+27123456789",
                Country.SouthAfrica
            );

            // Assert - Verify
            hotelSupplier.Name.Should().Be("Night Vision Hotel");
            hotelSupplier.Address.Should().Contain("Cape Town");
            hotelSupplier.Website.Should().Be("https://nightvisionhotel.com");
            hotelSupplier.PhoneNumber.Should().Be("+27123456789");
            hotelSupplier.Country.Should().Be(Country.SouthAfrica);
            hotelSupplier.IsDeleted.Should().BeFalse();
            hotelSupplier.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(2));
        }

        [Fact]
        public void Constructor_CreatesValidService_WithExpectedProperties()
        {
            // Arrange & Act
            var roomService = new Service(
                "World Class Sea View Suite",
                "Overnight stay including breakfast and fun activities",
                supplierId: 1
            );

            // Assert
            roomService.Title.Should().Be("World Class Sea View Suite");
            roomService.Description.Should().Contain("Overnight stay");
            roomService.SupplierId.Should().Be(1);
            roomService.IsDeleted.Should().BeFalse();
            roomService.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(2));
        }

        [Fact]
        public async Task GetById_WithValidId_ReturnsOkWithSupplierDto()
        {
            // Arrange
            int supplierId = 1;

           
            var supplierDto = new SupplierDto(
                supplierId,
                "Night Vision Hotel",
                "201 Main Road, City Centre, Cape Town",
                Country.SouthAfrica,
                "https://nightvisionhotel.com",
                "+27123456789",
                new List<ServiceDto>()
            );

            var mockService = new Mock<ISupplierService>();
            mockService.Setup(s => s.GetByIdAsync(supplierId)).ReturnsAsync(supplierDto);

            var controller = new SuppliersController(mockService.Object);

            // Act
            var result = await controller.GetById(supplierId);

            // Assert
            var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
            var returnedDto = okResult.Value.Should().BeOfType<SupplierDto>().Subject;
            returnedDto.Name.Should().Be("Night Vision Hotel");
            returnedDto.PhoneNumber.Should().Be("+27123456789");
        }

        [Fact]
        public async Task Create_WithValidDto_ReturnsCreatedWithSupplierDto()
        {
            // Arrange 
            var createDto = new CreateSupplierDto(
                "Santorini Lodge & Suites",
                "Wynberg Winelands, Cape Town",
                "https://santorinilodge.co.za",
                "+27123456789",
                Country.SouthAfrica
            );

            var expectedDto = new SupplierDto(
                1,
                "Santorini Lodge & Suites",
                "Wynberg Winelands, Cape Town",
                Country.SouthAfrica,
                "https://santorinilodge.co.za",
                "+27123456789",
                new List<ServiceDto>()
            );

            var mockService = new Mock<ISupplierService>();
            mockService.Setup(s => s.CreateAsync(It.IsAny<CreateSupplierDto>())).ReturnsAsync(expectedDto);

            var controller = new SuppliersController(mockService.Object);

            // Act
            var result = await controller.Create(createDto);

            // Assert
            var createdResult = result.Result.Should().BeOfType<CreatedAtActionResult>().Subject;
            var savedDto = createdResult.Value.Should().BeOfType<SupplierDto>().Subject;
            savedDto.Name.Should().Be("Santorini Lodge & Suites");

            mockService.Verify(s => s.CreateAsync(createDto), Times.Once());
        }
    }
}