using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevicesController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public DevicesController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<DeviceManagementResponse>> Get()
    {
        return Ok(await _data.GetDeviceManagementAsync());
    }

    [HttpGet("/api/device-management")]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<DeviceManagementResponse>> GetByAlias()
    {
        return Ok(await _data.GetDeviceManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<DeviceDto>> Create([FromBody] DeviceDto dto)
    {
        if (string.IsNullOrEmpty(dto.AssetCode) || string.IsNullOrEmpty(dto.Name))
            return BadRequest("Mã asset và tên thiết bị không được để trống");

        var device = EntityMapper.ToEntity(dto);
        _db.Devices.Add(device);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(device));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] DeviceDto dto)
    {
        var device = await _db.Devices.FindAsync(int.Parse(id));
        if (device == null)
            return NotFound();

        device.AssetCode = dto.AssetCode ?? device.AssetCode;
        device.Name = dto.Name ?? device.Name;
        device.Category = dto.Category ?? device.Category;
        device.Brand = dto.Brand ?? device.Brand;
        device.Status = dto.Status ?? device.Status;
        device.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật thiết bị thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var device = await _db.Devices.FindAsync(int.Parse(id));
        if (device == null)
            return NotFound();

        _db.Devices.Remove(device);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa thiết bị thành công" });
    }

    [HttpGet("test-db")]
    [AllowAnonymous]
    public async Task<IActionResult> TestDb()
    {
        return Ok(await _data.GetConnectionStatusAsync());
    }
}
