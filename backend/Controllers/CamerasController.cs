using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CamerasController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public CamerasController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<CameraManagementResponse>> Get()
    {
        return Ok(await _data.GetCameraManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<CameraDto>> Create([FromBody] CameraDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code) || string.IsNullOrEmpty(dto.Name))
            return BadRequest("Mã camera và tên camera không được để trống");

        var camera = EntityMapper.ToEntity(dto);
        _db.Cameras.Add(camera);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(camera));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] CameraDto dto)
    {
        var camera = await _db.Cameras.FindAsync(int.Parse(id));
        if (camera == null)
            return NotFound();

        camera.Code = dto.Code ?? camera.Code;
        camera.Name = dto.Name ?? camera.Name;
        camera.Room = dto.Room ?? camera.Room;
        camera.IpAddress = dto.IpAddress ?? camera.IpAddress;
        camera.Brand = dto.Brand ?? camera.Brand;
        camera.Model = dto.Model ?? camera.Model;
        camera.Resolution = dto.Resolution ?? camera.Resolution;
        camera.Status = dto.Status ?? camera.Status;
        camera.Warranty = dto.Warranty ?? camera.Warranty;
        camera.Note = dto.Note ?? camera.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật camera thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var camera = await _db.Cameras.FindAsync(int.Parse(id));
        if (camera == null)
            return NotFound();

        _db.Cameras.Remove(camera);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa camera thành công" });
    }
}
