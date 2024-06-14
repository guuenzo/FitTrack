using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("UsuarioObjetivo")]
    [Index(nameof(Objetivo), IsUnique = true)]
    public class UsuarioObjetivo
    {
        [Key]
        public Guid IdUsuarioObjetivo { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(60)")]
        public string? Objetivo { get; set; }
    }
}
