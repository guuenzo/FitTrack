using System;
using System;
using System.Collections.Generic;
using API_FitTrack.Domains;
using Microsoft.EntityFrameworkCore;

namespace API_FitTrack.Contexts;

public partial class FitTrackBdContext : DbContext
{
    public FitTrackBdContext()
    {
    }

    public FitTrackBdContext(DbContextOptions<FitTrackBdContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alimento> Alimentos { get; set; }

    public virtual DbSet<DietaAlimento> DietaAlimentos { get; set; }

    public virtual DbSet<Dieta> Dieta { get; set; }

    public virtual DbSet<Exercicio> Exercicios { get; set; }

    public virtual DbSet<Treino> Treinos { get; set; }

    public virtual DbSet<TreinoExercicio> TreinoExercicios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=NOTE14-SALA19; initial catalog=FitTrack_BD; user Id=sa; Pwd=Senai@134; TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alimento>(entity =>
        {
            entity.HasKey(e => e.IdAlimento).HasName("Alimento_PK");

            entity.ToTable("Alimento");

            entity.Property(e => e.IdAlimento)
                .ValueGeneratedNever()
                .HasColumnName("id_alimento");
            entity.Property(e => e.Calorias).HasColumnName("calorias");
            entity.Property(e => e.Carboidratos)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("carboidratos");
            entity.Property(e => e.Gorduras)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("gorduras");
            entity.Property(e => e.NomeAlimento)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome_alimento");
            entity.Property(e => e.Proteinas)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("proteinas");
        });

        modelBuilder.Entity<DietaAlimento>(entity =>
        {
            entity.HasKey(e => e.IdDietaAlimento).HasName("Dieta_Alimento_PK");

            entity.ToTable("Dieta_Alimento");

            entity.Property(e => e.IdDietaAlimento)
                .ValueGeneratedNever()
                .HasColumnName("id_dieta_alimento");
            entity.Property(e => e.AlimentoIdAlimento).HasColumnName("Alimento_id_alimento");
            entity.Property(e => e.DietaIdDieta).HasColumnName("Dieta_id_dieta");

            entity.HasOne(d => d.AlimentoIdAlimentoNavigation).WithMany(p => p.DietaAlimentos)
                .HasForeignKey(d => d.AlimentoIdAlimento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Dieta_Alimento_Alimento_FK");

            entity.HasOne(d => d.DietaIdDietaNavigation).WithMany(p => p.DietaAlimentos)
                .HasForeignKey(d => d.DietaIdDieta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Dieta_Alimento_Dieta_FK");
        });

        modelBuilder.Entity<Dieta>(entity =>
        {
            entity.HasKey(e => e.IdDieta).HasName("Dieta_PK");

            entity.Property(e => e.IdDieta)
                .ValueGeneratedNever()
                .HasColumnName("id_dieta");
            entity.Property(e => e.NomeDieta)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome_dieta");
            entity.Property(e => e.TotalCalorias)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("total_calorias");
            entity.Property(e => e.TotalCarboidratos)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("total_carboidratos");
            entity.Property(e => e.TotalGorduras)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("total_gorduras");
            entity.Property(e => e.TotalProteinas)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("total_proteinas");
            entity.Property(e => e.UsuarioIdUsuario).HasColumnName("Usuario_id_usuario");

            entity.HasOne(d => d.UsuarioIdUsuarioNavigation).WithMany(p => p.Dieta)
                .HasForeignKey(d => d.UsuarioIdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Dieta_Usuario_FK");
        });

        modelBuilder.Entity<Exercicio>(entity =>
        {
            entity.HasKey(e => e.IdExercicio).HasName("Exercicio_PK");

            entity.ToTable("Exercicio");

            entity.Property(e => e.IdExercicio)
                .ValueGeneratedNever()
                .HasColumnName("id_exercicio");
            entity.Property(e => e.Carga)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("carga");
            entity.Property(e => e.Descricao)
                .HasColumnType("text")
                .HasColumnName("descricao");
            entity.Property(e => e.FotoExercicio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("foto_exercicio");
            entity.Property(e => e.GrupoMuscular)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("grupo_muscular");
            entity.Property(e => e.NomeExercicio)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome_exercicio");
            entity.Property(e => e.Repeticoes).HasColumnName("repeticoes");
            entity.Property(e => e.Series).HasColumnName("series");
            entity.Property(e => e.VideoExecucao)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("video_execucao");
        });

        modelBuilder.Entity<Treino>(entity =>
        {
            entity.HasKey(e => e.IdTreino).HasName("Treino_PK");

            entity.ToTable("Treino");

            entity.Property(e => e.IdTreino)
                .ValueGeneratedNever()
                .HasColumnName("id_treino");
            entity.Property(e => e.NomeTreino)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome_treino");
            entity.Property(e => e.UsuarioIdUsuario).HasColumnName("Usuario_id_usuario");

            entity.HasOne(d => d.UsuarioIdUsuarioNavigation).WithMany(p => p.Treinos)
                .HasForeignKey(d => d.UsuarioIdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Treino_Usuario_FK");
        });

        modelBuilder.Entity<TreinoExercicio>(entity =>
        {
            entity.HasKey(e => e.IdTreinoExercicio).HasName("Treino_Exercicio_PK");

            entity.ToTable("Treino_Exercicio");

            entity.Property(e => e.IdTreinoExercicio)
                .ValueGeneratedNever()
                .HasColumnName("id_treino_exercicio");
            entity.Property(e => e.ExercicioIdExercicio).HasColumnName("Exercicio_id_exercicio");
            entity.Property(e => e.TreinoIdTreino).HasColumnName("Treino_id_treino");

            entity.HasOne(d => d.ExercicioIdExercicioNavigation).WithMany(p => p.TreinoExercicios)
                .HasForeignKey(d => d.ExercicioIdExercicio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Treino_Exercicio_Exercicio_FK");

            entity.HasOne(d => d.TreinoIdTreinoNavigation).WithMany(p => p.TreinoExercicios)
                .HasForeignKey(d => d.TreinoIdTreino)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Treino_Exercicio_Treino_FK");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("Usuario_PK");

            entity.ToTable("Usuario");

            entity.Property(e => e.IdUsuario)
                .ValueGeneratedNever()
                .HasColumnName("id_usuario");
            entity.Property(e => e.Altura)
                .HasColumnType("decimal(4, 2)")
                .HasColumnName("altura");
            entity.Property(e => e.CodigoRecuperacaoSenha)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("codigo_recuperacao_senha");
            //entity.Property(e => e.DataNascimento).HasColumnName("data_nascimento");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Foto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("foto");
            entity.Property(e => e.GoogleIdAccount)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("google_id_account");
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Peso)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("peso");
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("senha");
            entity.Property(e => e.Status)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("status");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
