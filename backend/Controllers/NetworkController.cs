using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NetworkController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public NetworkController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<NetworkManagementResponse>> Get()
    {
        return Ok(await _data.GetNetworkManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<NetworkDeviceDto>> Create([FromBody] NetworkDeviceDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code) || string.IsNullOrEmpty(dto.Name))
            return BadRequest("Mã thiết bị và tên thiết bị không được để trống");

        var device = EntityMapper.ToEntity(dto);
        _db.NetworkDevices.Add(device);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(device));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] NetworkDeviceDto dto)
    {
        var device = await _db.NetworkDevices.FindAsync(int.Parse(id));
        if (device == null)
            return NotFound();

        device.Code = dto.Code ?? device.Code;
        device.Name = dto.Name ?? device.Name;
        device.Type = dto.Type ?? device.Type;
        device.Brand = dto.Brand ?? device.Brand;
        device.Model = dto.Model ?? device.Model;
        device.Room = dto.Room ?? device.Room;
        device.IpAddress = dto.IpAddress ?? device.IpAddress;
        device.MacAddress = dto.MacAddress ?? device.MacAddress;
        device.Vlan = dto.Vlan ?? device.Vlan;
        device.Port = dto.Port ?? device.Port;
        device.Status = dto.Status ?? device.Status;
        device.Warranty = dto.Warranty ?? device.Warranty;
        device.Note = dto.Note ?? device.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật thiết bị mạng thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var device = await _db.NetworkDevices.FindAsync(int.Parse(id));
        if (device == null)
            return NotFound();

        _db.NetworkDevices.Remove(device);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa thiết bị mạng thành công" });
    }
}
