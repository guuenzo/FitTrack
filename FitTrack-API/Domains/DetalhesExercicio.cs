

using API_FitTrack.Domains;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("DetalhesExercicio")]
    public class DetalhesExercicio
    {
        [Key]
        public Guid IdDetalhesExercicio { get; set; } = Guid.NewGuid();

        [Column(TypeName = "INT")]
        public int? Series { get; set; }

        [Column(TypeName = "INT")]
        public int? Repeticoes { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Carga { get; set; }




        [ForeignKey("IdExercicio")]
        public Exercicio? Exercicio { get; set; }

        public Guid IdExercicio { get; set; }
    }
}
