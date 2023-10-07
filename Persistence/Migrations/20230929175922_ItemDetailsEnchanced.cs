using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ItemDetailsEnchanced : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemsDetails");

            migrationBuilder.AddColumn<string>(
                name: "CompressionClass",
                table: "OrderItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "OrderItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "CompressionClasses",
                table: "Items",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "Genders",
                table: "Items",
                type: "text[]",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompressionClass",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "CompressionClasses",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Genders",
                table: "Items");

            migrationBuilder.CreateTable(
                name: "ItemsDetails",
                columns: table => new
                {
                    ItemId = table.Column<string>(type: "text", nullable: false),
                    Size = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    ItemId1 = table.Column<Guid>(type: "uuid", nullable: true),
                    Left = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsDetails", x => new { x.ItemId, x.Size, x.Color });
                    table.ForeignKey(
                        name: "FK_ItemsDetails_Items_ItemId1",
                        column: x => x.ItemId1,
                        principalTable: "Items",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemsDetails_ItemId1",
                table: "ItemsDetails",
                column: "ItemId1");
        }
    }
}
