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


        public override bool Equals(object? obj)
        {
            if (obj is GrupoMuscular other)
            {
                return IdGrupoMuscular.Equals(other.IdGrupoMuscular);
            }
            return false;
        }

        public override int GetHashCode()
        {
            return IdGrupoMuscular.GetHashCode();
        }
    }
}
