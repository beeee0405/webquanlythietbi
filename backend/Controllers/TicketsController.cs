using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        // BUG-06: Auto-set RequesterId from JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userIdClaim))
        {
            // JWT stores AppIdentityUser.Id (GUID string), look up AppUser by email
            var identityUser = await _db.IdentityUsers.FindAsync(userIdClaim);
            if (identityUser != null)
            {
                var appUser = _db.AppUsers.FirstOrDefault(u => u.Email == identityUser.Email);
                if (appUser != null)
                    ticket.RequesterId = appUser.Id;
            }
        }

        if (string.IsNullOrEmpty(ticket.Code))
            ticket.Code = "TKT-" + Random.Shared.Next(10000, 99999); // BUG-12

        if (string.IsNullOrEmpty(ticket.CreatedAt))
            ticket.CreatedAt = DateTime.Now.ToString("dd/MM/yyyy");

        if (string.IsNullOrEmpty(ticket.UpdatedAt))
            ticket.UpdatedAt = ticket.CreatedAt;

        if (string.IsNullOrEmpty(ticket.Status))
            ticket.Status = "Mới";

        if (string.IsNullOrEmpty(ticket.Priority))
            ticket.Priority = "Trung bình";

        if (string.IsNullOrEmpty(ticket.Channel))
            ticket.Channel = "Trực tiếp";

        if (string.IsNullOrEmpty(ticket.Sla))
            ticket.Sla = "8h";

        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(ticket));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "AnyUser")]  // BUG-11: was InfrastructureOrAdmin, end-users need to update their own tickets
    public async Task<IActionResult> Update(string id, [FromBody] TicketDto dto)
    {
        var ticket = await _db.Tickets.FindAsync(int.Parse(id));
        if (ticket == null)
            return NotFound();

        ticket.Subject = dto.Subject ?? ticket.Subject;
        ticket.Status = dto.Status ?? ticket.Status;
        ticket.Priority = dto.Priority ?? ticket.Priority;
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
