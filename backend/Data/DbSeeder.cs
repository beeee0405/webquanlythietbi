using backend.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Devices.AnyAsync())
        {
            return;
        }

        foreach (var device in MockStore.Devices)
        {
            db.Devices.Add(EntityMapper.ToEntity(device));
        }

        foreach (var ticket in MockStore.Tickets)
        {
            db.Tickets.Add(EntityMapper.ToEntity(ticket));
        }

        foreach (var item in MockStore.MaintenanceItems)
        {
            db.MaintenanceItems.Add(EntityMapper.ToEntity(item));
        }

        await db.SaveChangesAsync();
    }
}
