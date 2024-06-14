using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack_API.Migrations
{
    /// <inheritdoc />
    public partial class adicionadaaforeignkeydeusuarioadetalhesexercicio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "IdUsuario",
                table: "DetalhesExercicio",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetalhesExercicio_IdUsuario",
                table: "DetalhesExercicio",
                column: "IdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalhesExercicio_Usuario_IdUsuario",
                table: "DetalhesExercicio",
                column: "IdUsuario",
                principalTable: "Usuario",
                principalColumn: "IdUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalhesExercicio_Usuario_IdUsuario",
                table: "DetalhesExercicio");

            migrationBuilder.DropIndex(
                name: "IX_DetalhesExercicio_IdUsuario",
                table: "DetalhesExercicio");

            migrationBuilder.DropColumn(
                name: "IdUsuario",
                table: "DetalhesExercicio");
        }
    }
}
