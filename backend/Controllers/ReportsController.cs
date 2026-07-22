using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly AppDataService _data;

    public ReportsController(AppDataService data)
    {
        _data = data;
    }

    [HttpGet]
    public async Task<ActionResult<ReportSummaryResponse>> Get()
    {
        return Ok(await _data.GetReportSummaryAsync());
    }
}
