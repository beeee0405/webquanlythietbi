using backend.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Device> Devices => Set<Device>();
    public DbSet<Ticket> Tickets => Set<Ticket>();
    public DbSet<MaintenanceItem> MaintenanceItems => Set<MaintenanceItem>();
    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<Camera> Cameras => Set<Camera>();
    public DbSet<NetworkDevice> NetworkDevices => Set<NetworkDevice>();
    public DbSet<InventorySession> InventorySessions => Set<InventorySession>();
    public DbSet<Transfer> Transfers => Set<Transfer>();
    public DbSet<Liquidation> Liquidations => Set<Liquidation>();
    public DbSet<Software> Softwares => Set<Software>();
    public DbSet<AppUser> AppUsers => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Device>().ToTable("Devices");
        modelBuilder.Entity<Ticket>().ToTable("Tickets");
        modelBuilder.Entity<MaintenanceItem>().ToTable("MaintenanceItems");
        modelBuilder.Entity<Room>().ToTable("Rooms");
        modelBuilder.Entity<Camera>().ToTable("Cameras");
        modelBuilder.Entity<NetworkDevice>().ToTable("NetworkDevices");
        modelBuilder.Entity<InventorySession>().ToTable("InventorySessions");
        modelBuilder.Entity<Transfer>().ToTable("Transfers");
        modelBuilder.Entity<Liquidation>().ToTable("Liquidations");
        modelBuilder.Entity<Software>().ToTable("Softwares");
        modelBuilder.Entity<AppUser>().ToTable("AppUsers");
    }
}
