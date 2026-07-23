using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public TicketsController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<TicketManagementResponse>> Get()
    {
        return Ok(await _data.GetTicketManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<TicketDto>> Create([FromBody] TicketDto dto)
    {
        if (string.IsNullOrEmpty(dto.Subject))
            return BadRequest("Tiêu đề không được để trống");

        var ticket = EntityMapper.ToEntity(dto);

        if (string.IsNullOrEmpty(ticket.Code))
            ticket.Code = "TKT-" + new Random().Next(10000, 99999);
        
        if (string.IsNullOrEmpty(ticket.CreatedAt))
            ticket.CreatedAt = DateTime.Now.ToString("dd/MM/yyyy");

        if (string.IsNullOrEmpty(ticket.UpdatedAt))
            ticket.UpdatedAt = ticket.CreatedAt;

        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(ticket));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] TicketDto dto)
    {
        var ticket = await _db.Tickets.FindAsync(int.Parse(id));
        if (ticket == null)
            return NotFound();

        ticket.Subject = dto.Subject ?? ticket.Subject;
        ticket.Status = dto.Status ?? ticket.Status;
        ticket.Priority = dto.Priority ?? ticket.Priority;
        ticket.Assignee = dto.Assignee ?? ticket.Assignee;
        ticket.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật ticket thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var ticket = await _db.Tickets.FindAsync(int.Parse(id));
        if (ticket == null)
            return NotFound();

        _db.Tickets.Remove(ticket);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa ticket thành công" });
    }
}
