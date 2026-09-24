using Microsoft.AspNetCore.Mvc;
using TravelogicBackend.Application.DTOs;
using TravelogicBackend.Application.Interfaces;

namespace TravelogicBackend.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SuppliersController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SupplierDto>>> GetAll(CancellationToken cancellationToken = default)
    {
        var suppliers = await _supplierService.GetAllAsync(cancellationToken);
        return Ok(suppliers);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SupplierDto>> GetById(int id, CancellationToken cancellationToken = default)
    {
        var supplier = await _supplierService.GetByIdAsync(id, cancellationToken);
        if (supplier == null) return NotFound();
        return Ok(supplier);
    }

    [HttpPost]
    public async Task<ActionResult<SupplierDto>> Create([FromBody] CreateSupplierDto dto)
    {
        var created = await _supplierService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSupplierDto dto, CancellationToken cancellationToken = default)
    {
        var updated = await _supplierService.UpdateAsync(id, dto, cancellationToken);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _supplierService.DeleteAsync(id, cancellationToken);
        if (!deleted) return NotFound();
        return NoContent();
    }
}