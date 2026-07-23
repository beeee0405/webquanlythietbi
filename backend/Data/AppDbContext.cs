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
    public DbSet<AppIdentityUser> IdentityUsers => Set<AppIdentityUser>();

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
        modelBuilder.Entity<AppIdentityUser>().ToTable("AppIdentityUsers");

        // Device relationships
        modelBuilder.Entity<Device>()
            .HasOne(d => d.Room)
            .WithMany()
            .HasForeignKey(d => d.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Device>()
            .HasOne(d => d.Owner)
            .WithMany()
            .HasForeignKey(d => d.OwnerId)
            .OnDelete(DeleteBehavior.SetNull);

        // Ticket relationships
        modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Requester)
            .WithMany()
            .HasForeignKey(t => t.RequesterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Assignee)
            .WithMany()
            .HasForeignKey(t => t.AssigneeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Room)
            .WithMany()
            .HasForeignKey(t => t.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Device)
            .WithMany()
            .HasForeignKey(t => t.DeviceId)
            .OnDelete(DeleteBehavior.Restrict);

        // Camera relationships
        modelBuilder.Entity<Camera>()
            .HasOne(c => c.Room)
            .WithMany()
            .HasForeignKey(c => c.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        // NetworkDevice relationships
        modelBuilder.Entity<NetworkDevice>()
            .HasOne(nd => nd.Room)
            .WithMany()
            .HasForeignKey(nd => nd.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        // MaintenanceItem relationships
        modelBuilder.Entity<MaintenanceItem>()
            .HasOne(mi => mi.Device)
            .WithMany()
            .HasForeignKey(mi => mi.DeviceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<MaintenanceItem>()
            .HasOne(mi => mi.Room)
            .WithMany()
            .HasForeignKey(mi => mi.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<MaintenanceItem>()
            .HasOne(mi => mi.Assignee)
            .WithMany()
            .HasForeignKey(mi => mi.AssigneeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Transfer relationships
        modelBuilder.Entity<Transfer>()
            .HasOne(tr => tr.Device)
            .WithMany()
            .HasForeignKey(tr => tr.DeviceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Transfer>()
            .HasOne(tr => tr.FromRoom)
            .WithMany()
            .HasForeignKey(tr => tr.FromRoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Transfer>()
            .HasOne(tr => tr.ToRoom)
            .WithMany()
            .HasForeignKey(tr => tr.ToRoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Transfer>()
            .HasOne(tr => tr.Requester)
            .WithMany()
            .HasForeignKey(tr => tr.RequesterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Transfer>()
            .HasOne(tr => tr.Approver)
            .WithMany()
            .HasForeignKey(tr => tr.ApproverId)
            .OnDelete(DeleteBehavior.SetNull);

        // Liquidation relationships
        modelBuilder.Entity<Liquidation>()
            .HasOne(l => l.Device)
            .WithMany()
            .HasForeignKey(l => l.DeviceId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Liquidation>()
            .HasOne(l => l.Room)
            .WithMany()
            .HasForeignKey(l => l.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Liquidation>()
            .HasOne(l => l.Requester)
            .WithMany()
            .HasForeignKey(l => l.RequesterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Liquidation>()
            .HasOne(l => l.Approver)
            .WithMany()
            .HasForeignKey(l => l.ApproverId)
            .OnDelete(DeleteBehavior.SetNull);

        // InventorySession relationships
        modelBuilder.Entity<InventorySession>()
            .HasOne(s => s.Room)
            .WithMany()
            .HasForeignKey(s => s.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<InventorySession>()
            .HasOne(s => s.Inspector)
            .WithMany()
            .HasForeignKey(s => s.InspectorId)
            .OnDelete(DeleteBehavior.SetNull);

        // Software relationships
        modelBuilder.Entity<Software>()
            .HasOne(sw => sw.Room)
            .WithMany()
            .HasForeignKey(sw => sw.RoomId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
