using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ItemEntityModified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<string>>(
                name: "Colors",
                table: "Items",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Items",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "Sizes",
                table: "Items",
                type: "text[]",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colors",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Sizes",
                table: "Items");
        }
    }
}
