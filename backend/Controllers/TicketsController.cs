using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly AppDataService _data;

    public TicketsController(AppDataService data)
    {
        _data = data;
    }

    [HttpGet]
    public async Task<ActionResult<TicketManagementResponse>> Get()
    {
        return Ok(await _data.GetTicketManagementAsync());
    }
}
