using Microsoft.AspNetCore.Mvc;
using TravelogicBackend.Application.DTOs;
using TravelogicBackend.Application.Interfaces;

namespace TravelogicBackend.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IServiceService _service;

    public ServicesController(IServiceService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAll(CancellationToken cancellationToken = default)
    {
        var services = await _service.GetAllAsync(cancellationToken);
        return Ok(services);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ServiceDto>> GetById(int id, CancellationToken cancellationToken = default)
    {
        var service = await _service.GetByIdAsync(id, cancellationToken);
        if (service == null) return NotFound();
        return Ok(service);
    }

    [HttpPost]
    public async Task<ActionResult<ServiceDto>> Create([FromBody] CreateServiceDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateServiceDto dto, CancellationToken cancellationToken = default)
    {
        var updated = await _service.UpdateAsync(id, dto, cancellationToken);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken = default)
    {
        var deleted = await _service.DeleteAsync(id, cancellationToken);
        if (!deleted) return NotFound();
        return NoContent();
    }
}