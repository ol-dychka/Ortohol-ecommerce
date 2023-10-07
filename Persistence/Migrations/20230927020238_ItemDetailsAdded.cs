using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ItemDetailsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeftCount",
                table: "Items");

            migrationBuilder.AddColumn<string>(
                name: "MobileNumber",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ItemsDetails",
                columns: table => new
                {
                    ItemId = table.Column<string>(type: "text", nullable: false),
                    Size = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    Left = table.Column<int>(type: "integer", nullable: false),
                    ItemId1 = table.Column<Guid>(type: "uuid", nullable: true)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemsDetails");

            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "LeftCount",
                table: "Items",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
