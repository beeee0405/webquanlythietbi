using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MaintenanceController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public MaintenanceController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<MaintenanceManagementResponse>> Get()
    {
        return Ok(await _data.GetMaintenanceManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<MaintenanceDto>> Create([FromBody] MaintenanceDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code) || string.IsNullOrEmpty(dto.Title))
            return BadRequest("Mã bảo trì và tiêu đề không được để trống");

        var item = EntityMapper.ToEntity(dto);
        _db.MaintenanceItems.Add(item);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(item));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] MaintenanceDto dto)
    {
        var item = await _db.MaintenanceItems.FindAsync(int.Parse(id));
        if (item == null)
            return NotFound();

        item.Title = dto.Title ?? item.Title;
        item.Status = dto.Status ?? item.Status;
        item.Type = dto.Type ?? item.Type;
        item.Priority = dto.Priority ?? item.Priority;
        item.Assignee = dto.Assignee ?? item.Assignee;
        item.CompletedAt = dto.CompletedAt ?? item.CompletedAt;
        item.Note = dto.Note ?? item.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật bảo trì thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var item = await _db.MaintenanceItems.FindAsync(int.Parse(id));
        if (item == null)
            return NotFound();

        _db.MaintenanceItems.Remove(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa bảo trì thành công" });
    }
}
