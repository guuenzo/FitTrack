﻿// <auto-generated />
using System;
using FitTrack_API.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FitTrack_API.Migrations
{
    [DbContext(typeof(FitTrackContext))]
    [Migration("20240613225837_adicionadatabeladedetalhesexercicio")]
    partial class adicionadatabeladedetalhesexercicio
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API_FitTrack.Domains.Exercicio", b =>
                {
                    b.Property<Guid>("IdExercicio")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("IdGrupoMuscular")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("IdMidiaExercicio")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("NomeExercicio")
                        .IsRequired()
                        .HasColumnType("VARCHAR(40)");

                    b.HasKey("IdExercicio");

                    b.HasIndex("IdGrupoMuscular");

                    b.HasIndex("IdMidiaExercicio");

                    b.HasIndex("NomeExercicio")
                        .IsUnique();

                    b.ToTable("Exercicio");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Refeicao", b =>
                {
                    b.Property<Guid>("IdRefeicao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdUsuario")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("NomeRefeicao")
                        .IsRequired()
                        .HasColumnType("VARCHAR(60)");

                    b.HasKey("IdRefeicao");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Refeicao");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Treino", b =>
                {
                    b.Property<Guid>("IdTreino")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdUsuario")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LetraNomeTreino")
                        .IsRequired()
                        .HasColumnType("CHAR(1)");

                    b.HasKey("IdTreino");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Treino");
                });

            modelBuilder.Entity("API_FitTrack.Domains.TreinoExercicio", b =>
                {
                    b.Property<Guid>("IdTreinoExercicio")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdExercicio")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdTreino")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("IdTreinoExercicio");

                    b.HasIndex("IdExercicio");

                    b.HasIndex("IdTreino");

                    b.ToTable("TreinoExercicio");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Usuario", b =>
                {
                    b.Property<Guid>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal?>("Altura")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<int?>("CodigoRecuperacaoSenha")
                        .HasColumnType("INT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.Property<Guid>("IdUsuarioMidia")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("IdUsuarioObjetivo")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)");

                    b.Property<decimal?>("Peso")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR(60)");

                    b.HasKey("IdUsuario");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("IdUsuarioMidia");

                    b.HasIndex("IdUsuarioObjetivo");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("FitTrack_API.Domains.Alimento", b =>
                {
                    b.Property<Guid>("IdAlimento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal?>("Calorias")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<decimal?>("Carboidratos")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<decimal?>("Gorduras")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<string>("NomeAlimento")
                        .IsRequired()
                        .HasColumnType("VARCHAR(60)");

                    b.Property<decimal?>("Peso")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<decimal?>("Proteinas")
                        .HasColumnType("DECIMAL(7,2)");

                    b.HasKey("IdAlimento");

                    b.ToTable("Alimento");
                });

            modelBuilder.Entity("FitTrack_API.Domains.DetalhesExercicio", b =>
                {
                    b.Property<Guid>("IdDetalhesExercicio")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal?>("Carga")
                        .HasColumnType("DECIMAL(7,2)");

                    b.Property<Guid>("IdExercicio")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Repeticoes")
                        .HasColumnType("INT");

                    b.Property<int?>("Series")
                        .HasColumnType("INT");

                    b.HasKey("IdDetalhesExercicio");

                    b.HasIndex("IdExercicio");

                    b.ToTable("DetalhesExercicio");
                });

            modelBuilder.Entity("FitTrack_API.Domains.GrupoMuscular", b =>
                {
                    b.Property<Guid>("IdGrupoMuscular")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("NomeGrupoMuscular")
                        .IsRequired()
                        .HasColumnType("VARCHAR(40)");

                    b.HasKey("IdGrupoMuscular");

                    b.HasIndex("NomeGrupoMuscular")
                        .IsUnique();

                    b.ToTable("GrupoMuscular");
                });

            modelBuilder.Entity("FitTrack_API.Domains.MidiaExercicio", b =>
                {
                    b.Property<Guid>("IdMidiaExercicio")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BlobNameVideoExercicio")
                        .HasColumnType("TEXT");

                    b.Property<string>("VideoExercicio")
                        .HasColumnType("TEXT");

                    b.HasKey("IdMidiaExercicio");

                    b.ToTable("MidiaExercicio");
                });

            modelBuilder.Entity("FitTrack_API.Domains.RefeicaoAlimento", b =>
                {
                    b.Property<Guid>("IdRefeicaoAlimento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdAlimento")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdRefeicao")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("IdRefeicaoAlimento");

                    b.HasIndex("IdAlimento");

                    b.HasIndex("IdRefeicao");

                    b.ToTable("RefeicaoAlimento");
                });

            modelBuilder.Entity("FitTrack_API.Domains.UsuarioMidia", b =>
                {
                    b.Property<Guid>("IdUsuarioMidia")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BlobNameFotoUsuario")
                        .HasColumnType("TEXT");

                    b.Property<string>("FotoUsuario")
                        .HasColumnType("TEXT");

                    b.HasKey("IdUsuarioMidia");

                    b.ToTable("UsuarioMidia");
                });

            modelBuilder.Entity("FitTrack_API.Domains.UsuarioObjetivo", b =>
                {
                    b.Property<Guid>("IdUsuarioObjetivo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Objetivo")
                        .HasColumnType("VARCHAR(60)");

                    b.HasKey("IdUsuarioObjetivo");

                    b.HasIndex("Objetivo")
                        .IsUnique()
                        .HasFilter("[Objetivo] IS NOT NULL");

                    b.ToTable("UsuarioObjetivo");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Exercicio", b =>
                {
                    b.HasOne("FitTrack_API.Domains.GrupoMuscular", "GrupoMuscular")
                        .WithMany()
                        .HasForeignKey("IdGrupoMuscular")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitTrack_API.Domains.MidiaExercicio", "MidiaExercicio")
                        .WithMany()
                        .HasForeignKey("IdMidiaExercicio");

                    b.Navigation("GrupoMuscular");

                    b.Navigation("MidiaExercicio");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Refeicao", b =>
                {
                    b.HasOne("API_FitTrack.Domains.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Treino", b =>
                {
                    b.HasOne("API_FitTrack.Domains.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("API_FitTrack.Domains.TreinoExercicio", b =>
                {
                    b.HasOne("API_FitTrack.Domains.Exercicio", "Exercicio")
                        .WithMany()
                        .HasForeignKey("IdExercicio")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_FitTrack.Domains.Treino", "Treino")
                        .WithMany()
                        .HasForeignKey("IdTreino")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercicio");

                    b.Navigation("Treino");
                });

            modelBuilder.Entity("API_FitTrack.Domains.Usuario", b =>
                {
                    b.HasOne("FitTrack_API.Domains.UsuarioMidia", "UsuarioMidia")
                        .WithMany()
                        .HasForeignKey("IdUsuarioMidia")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FitTrack_API.Domains.UsuarioObjetivo", "UsuarioObjetivo")
                        .WithMany()
                        .HasForeignKey("IdUsuarioObjetivo");

                    b.Navigation("UsuarioMidia");

                    b.Navigation("UsuarioObjetivo");
                });

            modelBuilder.Entity("FitTrack_API.Domains.DetalhesExercicio", b =>
                {
                    b.HasOne("API_FitTrack.Domains.Exercicio", "Exercicio")
                        .WithMany()
                        .HasForeignKey("IdExercicio")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercicio");
                });

            modelBuilder.Entity("FitTrack_API.Domains.RefeicaoAlimento", b =>
                {
                    b.HasOne("FitTrack_API.Domains.Alimento", "Alimento")
                        .WithMany()
                        .HasForeignKey("IdAlimento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_FitTrack.Domains.Refeicao", "Refeicao")
                        .WithMany()
                        .HasForeignKey("IdRefeicao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Alimento");

                    b.Navigation("Refeicao");
                });
#pragma warning restore 612, 618
        }
    }
}
