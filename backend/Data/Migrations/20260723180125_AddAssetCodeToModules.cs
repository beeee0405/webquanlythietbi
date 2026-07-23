using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAssetCodeToModules : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssetCode",
                table: "Transfers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AssetName",
                table: "Transfers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AssetCode",
                table: "MaintenanceItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AssetName",
                table: "MaintenanceItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AssetCode",
                table: "Liquidations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AssetName",
                table: "Liquidations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetCode",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "AssetName",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "AssetCode",
                table: "MaintenanceItems");

            migrationBuilder.DropColumn(
                name: "AssetName",
                table: "MaintenanceItems");

            migrationBuilder.DropColumn(
                name: "AssetCode",
                table: "Liquidations");

            migrationBuilder.DropColumn(
                name: "AssetName",
                table: "Liquidations");
        }
    }
}
