using FitTrack_API.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_FitTrack.Domains
{
    [Table("Exercicio")]
    [Index(nameof(NomeExercicio), IsUnique = true)]
    public partial class Exercicio
    {
        [Key]
        public Guid IdExercicio { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(40)")]
        [Required(ErrorMessage = "O Nome é obrigatório!")]
        public string NomeExercicio { get; set; } = null!;

        [Column(TypeName = "TEXT")]
        public string? Descricao { get; set; }

        [Column(TypeName = "INT")]
        public int Repeticoes { get; set; }

        [Column(TypeName = "INT")]
        public int Series { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal Carga { get; set; }



        [ForeignKey("IdGrupoMuscular")]
        public GrupoMuscular? GrupoMuscular { get; set; }
        public Guid IdGrupoMuscular { get; set; }



        [ForeignKey("IdMidiaExercicio")]
        public MidiaExercicio? MidiaExercicio { get; set; }
        public Guid IdMidiaExercicio { get; set; }
    }
}
