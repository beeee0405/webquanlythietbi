using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransferController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public TransferController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<TransferManagementResponse>> Get()
    {
        return Ok(await _data.GetTransferManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<TransferDto>> Create([FromBody] TransferDto dto)
    {
        if (string.IsNullOrEmpty(dto.Code))
            return BadRequest("Mã điều chuyển không được để trống");

        var transfer = EntityMapper.ToEntity(dto);
        _db.Transfers.Add(transfer);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(transfer));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] TransferDto dto)
    {
        var transfer = await _db.Transfers.FindAsync(int.Parse(id));
        if (transfer == null)
            return NotFound();

        transfer.Code = dto.Code ?? transfer.Code;
        transfer.Status = dto.Status ?? transfer.Status;
        transfer.TransferredAt = dto.TransferredAt ?? transfer.TransferredAt;
        transfer.Note = dto.Note ?? transfer.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật điều chuyển thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var transfer = await _db.Transfers.FindAsync(int.Parse(id));
        if (transfer == null)
            return NotFound();

        _db.Transfers.Remove(transfer);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa điều chuyển thành công" });
    }
}
