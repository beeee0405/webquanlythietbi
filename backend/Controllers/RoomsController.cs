using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public RoomsController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<RoomManagementResponse>> Get()
    {
        return Ok(await _data.GetRoomManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<RoomDto>> Create([FromBody] RoomDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code) || string.IsNullOrEmpty(dto.Name))
            return BadRequest("Mã phòng và tên phòng không được để trống");

        var room = EntityMapper.ToEntity(dto);
        _db.Rooms.Add(room);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(room));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] RoomDto dto)
    {
        var room = await _db.Rooms.FindAsync(int.Parse(id));
        if (room == null)
            return NotFound();

        room.Code = dto.Code ?? room.Code;
        room.Name = dto.Name ?? room.Name;
        room.Building = dto.Building ?? room.Building;
        room.Floor = dto.Floor ?? room.Floor;
        room.Type = dto.Type ?? room.Type;
        room.Manager = dto.Manager ?? room.Manager;
        room.Note = dto.Note ?? room.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật phòng thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var room = await _db.Rooms.FindAsync(int.Parse(id));
        if (room == null)
            return NotFound();

        _db.Rooms.Remove(room);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa phòng thành công" });
    }
}
