using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("GrupoMuscular")]
    [Index(nameof(NomeGrupoMuscular), IsUnique = true)]
    public class GrupoMuscular
    {
        [Key]
        public Guid IdGrupoMuscular { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(40)")]
        [Required(ErrorMessage = "O Nome é obrigatório!")]
        public string? NomeGrupoMuscular { get; set; }
    }
}
