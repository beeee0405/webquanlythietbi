using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SoftwareController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public SoftwareController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<SoftwareManagementResponse>> Get()
    {
        return Ok(await _data.GetSoftwareManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<ActionResult<SoftwareDto>> Create([FromBody] SoftwareDto dto)
    {
        if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Publisher))
            return BadRequest("Tên phần mềm và nhà phát hành không được để trống");

        var software = EntityMapper.ToEntity(dto);
        if (string.IsNullOrEmpty(software.Status))
            software.Status = "Đang dùng";
        if (string.IsNullOrEmpty(software.Category))
            software.Category = "Khác";
        if (string.IsNullOrEmpty(software.LicenseType))
            software.LicenseType = "Bản quyền";
        
        _db.Softwares.Add(software);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(software));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "InfrastructureOrAdmin")]
    public async Task<IActionResult> Update(string id, [FromBody] SoftwareDto dto)
    {
        var software = await _db.Softwares.FindAsync(int.Parse(id));
        if (software == null)
            return NotFound();

        software.Name = dto.Name ?? software.Name;
        software.Publisher = dto.Publisher ?? software.Publisher;
        software.Version = dto.Version ?? software.Version;
        software.Category = dto.Category ?? software.Category;
        software.LicenseType = dto.LicenseType ?? software.LicenseType;
        software.LicenseKey = dto.LicenseKey ?? software.LicenseKey;
        if (!string.IsNullOrEmpty(dto.TotalLicenses) && int.TryParse(dto.TotalLicenses, out var tl))
            software.TotalLicenses = tl;
        if (!string.IsNullOrEmpty(dto.UsedLicenses) && int.TryParse(dto.UsedLicenses, out var ul))
            software.UsedLicenses = ul;
        software.ExpiresAt = dto.ExpiresAt ?? software.ExpiresAt;
        software.Status = dto.Status ?? software.Status;
        software.Note = dto.Note ?? software.Note;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật phần mềm thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(string id)
    {
        var software = await _db.Softwares.FindAsync(int.Parse(id));
        if (software == null)
            return NotFound();

        _db.Softwares.Remove(software);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa phần mềm thành công" });
    }
}
