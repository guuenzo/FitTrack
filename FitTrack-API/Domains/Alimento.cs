using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("Alimento")]
    [Index(nameof(NomeAlimento), IsUnique = true)]
    public class Alimento
    {
        [Key]
        public Guid IdAlimento { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(60)")]
        [Required(ErrorMessage = "O Nome é obrigatório!")]
        public string? NomeAlimento { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Peso { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Proteinas { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Calorias { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Carboidratos { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Gorduras { get; set; }
    }
}
