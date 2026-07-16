using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevicesController : ControllerBase
{
    private readonly AppDataService _data;

    public DevicesController(AppDataService data)
    {
        _data = data;
    }

    [HttpGet]
    public async Task<ActionResult<DeviceManagementResponse>> Get()
    {
        return Ok(await _data.GetDeviceManagementAsync());
    }

    [HttpGet("test-db")]
    public async Task<IActionResult> TestDb()
    {
        return Ok(await _data.GetConnectionStatusAsync());
    }
}
