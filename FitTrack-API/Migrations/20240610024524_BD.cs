using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack_API.Migrations
{
    /// <inheritdoc />
    public partial class BD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alimento",
                columns: table => new
                {
                    IdAlimento = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeAlimento = table.Column<string>(type: "VARCHAR(60)", nullable: false),
                    Peso = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    Proteinas = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    Calorias = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    Carboidratos = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    Gorduras = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alimento", x => x.IdAlimento);
                });

            migrationBuilder.CreateTable(
                name: "GrupoMuscular",
                columns: table => new
                {
                    IdGrupoMuscular = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeGrupoMuscular = table.Column<string>(type: "VARCHAR(40)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrupoMuscular", x => x.IdGrupoMuscular);
                });

            migrationBuilder.CreateTable(
                name: "MidiaExercicio",
                columns: table => new
                {
                    IdMidiaExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FotoExercicio = table.Column<string>(type: "TEXT", nullable: true),
                    VideoExercicio = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MidiaExercicio", x => x.IdMidiaExercicio);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioMidia",
                columns: table => new
                {
                    IdUsuarioMidia = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FotoUsuario = table.Column<string>(type: "TEXT", nullable: true),
                    BlobNameFotoUsuario = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioMidia", x => x.IdUsuarioMidia);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioObjetivo",
                columns: table => new
                {
                    IdUsuarioObjetivo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Objetivo = table.Column<string>(type: "VARCHAR(60)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioObjetivo", x => x.IdUsuarioObjetivo);
                });

            migrationBuilder.CreateTable(
                name: "Exercicio",
                columns: table => new
                {
                    IdExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeExercicio = table.Column<string>(type: "VARCHAR(40)", nullable: false),
                    Descricao = table.Column<string>(type: "TEXT", nullable: true),
                    Repeticoes = table.Column<int>(type: "INT", nullable: false),
                    Series = table.Column<int>(type: "INT", nullable: false),
                    Carga = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: false),
                    IdGrupoMuscular = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdMidiaExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercicio", x => x.IdExercicio);
                    table.ForeignKey(
                        name: "FK_Exercicio_GrupoMuscular_IdGrupoMuscular",
                        column: x => x.IdGrupoMuscular,
                        principalTable: "GrupoMuscular",
                        principalColumn: "IdGrupoMuscular",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Exercicio_MidiaExercicio_IdMidiaExercicio",
                        column: x => x.IdMidiaExercicio,
                        principalTable: "MidiaExercicio",
                        principalColumn: "IdMidiaExercicio",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    IdUsuario = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Email = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Senha = table.Column<string>(type: "VARCHAR(60)", maxLength: 60, nullable: false),
                    Peso = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    Altura = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    CodigoRecuperacaoSenha = table.Column<int>(type: "INT", nullable: true),
                    IdUsuarioMidia = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdUsuarioObjetivo = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuario_UsuarioMidia_IdUsuarioMidia",
                        column: x => x.IdUsuarioMidia,
                        principalTable: "UsuarioMidia",
                        principalColumn: "IdUsuarioMidia",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Usuario_UsuarioObjetivo_IdUsuarioObjetivo",
                        column: x => x.IdUsuarioObjetivo,
                        principalTable: "UsuarioObjetivo",
                        principalColumn: "IdUsuarioObjetivo");
                });

            migrationBuilder.CreateTable(
                name: "Refeicao",
                columns: table => new
                {
                    IdRefeicao = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeRefeicao = table.Column<string>(type: "VARCHAR(60)", nullable: false),
                    IdUsuario = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refeicao", x => x.IdRefeicao);
                    table.ForeignKey(
                        name: "FK_Refeicao_Usuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Treino",
                columns: table => new
                {
                    IdTreino = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeTreino = table.Column<int>(type: "INT", nullable: false),
                    IdUsuario = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treino", x => x.IdTreino);
                    table.ForeignKey(
                        name: "FK_Treino_Usuario_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuario",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefeicaoAlimento",
                columns: table => new
                {
                    IdRefeicaoAlimento = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdRefeicao = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdAlimento = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefeicaoAlimento", x => x.IdRefeicaoAlimento);
                    table.ForeignKey(
                        name: "FK_RefeicaoAlimento_Alimento_IdAlimento",
                        column: x => x.IdAlimento,
                        principalTable: "Alimento",
                        principalColumn: "IdAlimento",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RefeicaoAlimento_Refeicao_IdRefeicao",
                        column: x => x.IdRefeicao,
                        principalTable: "Refeicao",
                        principalColumn: "IdRefeicao",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TreinoExercicio",
                columns: table => new
                {
                    IdTreinoExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdTreino = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdExercicio = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreinoExercicio", x => x.IdTreinoExercicio);
                    table.ForeignKey(
                        name: "FK_TreinoExercicio_Exercicio_IdExercicio",
                        column: x => x.IdExercicio,
                        principalTable: "Exercicio",
                        principalColumn: "IdExercicio",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TreinoExercicio_Treino_IdTreino",
                        column: x => x.IdTreino,
                        principalTable: "Treino",
                        principalColumn: "IdTreino",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alimento_NomeAlimento",
                table: "Alimento",
                column: "NomeAlimento",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exercicio_IdGrupoMuscular",
                table: "Exercicio",
                column: "IdGrupoMuscular");

            migrationBuilder.CreateIndex(
                name: "IX_Exercicio_IdMidiaExercicio",
                table: "Exercicio",
                column: "IdMidiaExercicio");

            migrationBuilder.CreateIndex(
                name: "IX_Exercicio_NomeExercicio",
                table: "Exercicio",
                column: "NomeExercicio",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GrupoMuscular_NomeGrupoMuscular",
                table: "GrupoMuscular",
                column: "NomeGrupoMuscular",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Refeicao_IdUsuario",
                table: "Refeicao",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_RefeicaoAlimento_IdAlimento",
                table: "RefeicaoAlimento",
                column: "IdAlimento");

            migrationBuilder.CreateIndex(
                name: "IX_RefeicaoAlimento_IdRefeicao",
                table: "RefeicaoAlimento",
                column: "IdRefeicao");

            migrationBuilder.CreateIndex(
                name: "IX_Treino_IdUsuario",
                table: "Treino",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_TreinoExercicio_IdExercicio",
                table: "TreinoExercicio",
                column: "IdExercicio");

            migrationBuilder.CreateIndex(
                name: "IX_TreinoExercicio_IdTreino",
                table: "TreinoExercicio",
                column: "IdTreino");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_Email",
                table: "Usuario",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_IdUsuarioMidia",
                table: "Usuario",
                column: "IdUsuarioMidia");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_IdUsuarioObjetivo",
                table: "Usuario",
                column: "IdUsuarioObjetivo");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioObjetivo_Objetivo",
                table: "UsuarioObjetivo",
                column: "Objetivo",
                unique: true,
                filter: "[Objetivo] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefeicaoAlimento");

            migrationBuilder.DropTable(
                name: "TreinoExercicio");

            migrationBuilder.DropTable(
                name: "Alimento");

            migrationBuilder.DropTable(
                name: "Refeicao");

            migrationBuilder.DropTable(
                name: "Exercicio");

            migrationBuilder.DropTable(
                name: "Treino");

            migrationBuilder.DropTable(
                name: "GrupoMuscular");

            migrationBuilder.DropTable(
                name: "MidiaExercicio");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "UsuarioMidia");

            migrationBuilder.DropTable(
                name: "UsuarioObjetivo");
        }
    }
}
