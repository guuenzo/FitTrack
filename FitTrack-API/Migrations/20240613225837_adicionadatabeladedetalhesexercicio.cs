using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack_API.Migrations
{
    /// <inheritdoc />
    public partial class adicionadatabeladedetalhesexercicio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LetraNomeTreino",
                table: "Treino");

            migrationBuilder.AddColumn<string>(
                name: "LetraNomeTreino",
                table: "Treino",
                type: "CHAR(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "DetalhesExercicio",
                columns: table => new
                {
                    IdDetalhesExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Series = table.Column<int>(type: "INT", nullable: true),
                    Repeticoes = table.Column<int>(type: "INT", nullable: true),
                    Carga = table.Column<decimal>(type: "DECIMAL(7,2)", nullable: true),
                    IdExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalhesExercicio", x => x.IdDetalhesExercicio);
                    table.ForeignKey(
                        name: "FK_DetalhesExercicio_Exercicio_IdExercicio",
                        column: x => x.IdExercicio,
                        principalTable: "Exercicio",
                        principalColumn: "IdExercicio",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetalhesExercicio_IdExercicio",
                table: "DetalhesExercicio",
                column: "IdExercicio");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalhesExercicio");

            migrationBuilder.DropColumn(
                name: "LetraNomeTreino",
                table: "Treino");

            migrationBuilder.AddColumn<char>(
                name: "LetraNomeTreino",
                table: "Treino",
                type: "char(1)",
                nullable: false,
                defaultValue: 0);
             
        }
    }
}
