using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("UsuarioMidia")]

    public class UsuarioMidia
    {
        [Key]
        public Guid IdUsuarioMidia { get; set; } = Guid.NewGuid();

        [Column(TypeName = "TEXT")]
        public string? FotoUsuario { get; set; }

        [Column(TypeName = "TEXT")]
        public string? BlobNameFotoUsuario { get; set; }

    }
}
