using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public InventoryController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<InventoryManagementResponse>> Get()
    {
        return Ok(await _data.GetInventoryManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<InventorySessionDto>> Create([FromBody] InventorySessionDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code) || string.IsNullOrEmpty(dto.Room))
            return BadRequest("Mã đợt và phòng không được để trống");

        var session = EntityMapper.ToEntity(dto);
        _db.InventorySessions.Add(session);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(session));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] InventorySessionDto dto)
    {
        var session = await _db.InventorySessions.FindAsync(int.Parse(id));
        if (session == null)
            return NotFound();

        session.Code = dto.Code ?? session.Code;
        session.Room = dto.Room ?? session.Room;
        session.Inspector = dto.Inspector ?? session.Inspector;
        session.Status = dto.Status ?? session.Status;
        if (int.TryParse(dto.TotalDevices, out var t)) session.TotalDevices = t;
        if (int.TryParse(dto.CheckedDevices, out var c)) session.CheckedDevices = c;
        if (int.TryParse(dto.MissingDevices, out var m)) session.MissingDevices = m;
        if (int.TryParse(dto.ExtraDevices, out var e)) session.ExtraDevices = e;
        session.CompletedAt = dto.CompletedAt ?? session.CompletedAt;
        session.Note = dto.Note ?? session.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật đợt kiểm kê thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var session = await _db.InventorySessions.FindAsync(int.Parse(id));
        if (session == null)
            return NotFound();

        _db.InventorySessions.Remove(session);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa đợt kiểm kê thành công" });
    }
}
