using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LiquidationController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public LiquidationController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<LiquidationManagementResponse>> Get()
    {
        return Ok(await _data.GetLiquidationManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<LiquidationDto>> Create([FromBody] LiquidationDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code))
            return BadRequest("Mã yêu cầu không được để trống");

        var item = EntityMapper.ToEntity(dto);
        _db.Liquidations.Add(item);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(item));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] LiquidationDto dto)
    {
        var item = await _db.Liquidations.FindAsync(int.Parse(id));
        if (item == null)
            return NotFound();

        item.Code = dto.Code ?? item.Code;
        item.Reason = dto.Reason ?? item.Reason;
        item.Condition = dto.Condition ?? item.Condition;
        item.Status = dto.Status ?? item.Status;
        item.CompletedAt = dto.CompletedAt ?? item.CompletedAt;
        item.Note = dto.Note ?? item.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật yêu cầu thanh lý thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var item = await _db.Liquidations.FindAsync(int.Parse(id));
        if (item == null)
            return NotFound();

        _db.Liquidations.Remove(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa yêu cầu thanh lý thành công" });
    }
}
