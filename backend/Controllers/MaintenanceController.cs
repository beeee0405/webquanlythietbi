using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MaintenanceController : ControllerBase
{
    private readonly AppDataService _data;

    public MaintenanceController(AppDataService data)
    {
        _data = data;
    }

    [HttpGet]
    public async Task<ActionResult<MaintenanceManagementResponse>> Get()
    {
        return Ok(await _data.GetMaintenanceManagementAsync());
    }
}
