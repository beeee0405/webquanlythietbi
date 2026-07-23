using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/debug")]
public class DebugController : ControllerBase
{
    private readonly AppDbContext _db;

    public DebugController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("users")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _db.AppUsers.ToListAsync();
        return Ok(new
        {
            count = users.Count,
            users
        });
    }

    [HttpGet("devices")]
    [AllowAnonymous]
    public async Task<IActionResult> GetDevices()
    {
        var devices = await _db.Devices.ToListAsync();
        return Ok(new
        {
            count = devices.Count,
            devices = devices.Take(50)
        });
    }

    [HttpGet("tables")]
    [AllowAnonymous]
    public async Task<IActionResult> GetTables()
    {
        return Ok(new
        {
            users = await _db.AppUsers.CountAsync(),
            devices = await _db.Devices.CountAsync(),
            tickets = await _db.Tickets.CountAsync(),
            maintenance = await _db.MaintenanceItems.CountAsync(),
            cameras = await _db.Cameras.CountAsync(),
            rooms = await _db.Rooms.CountAsync(),
            networkDevices = await _db.NetworkDevices.CountAsync(),
            software = await _db.Softwares.CountAsync(),
            inventory = await _db.InventorySessions.CountAsync(),
            transfers = await _db.Transfers.CountAsync(),
            liquidations = await _db.Liquidations.CountAsync()
        });
    }
}
