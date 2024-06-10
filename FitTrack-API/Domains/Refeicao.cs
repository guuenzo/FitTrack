using FitTrack_API.Domains;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_FitTrack.Domains
{
    [Table("Refeicao")]
    public partial class Refeicao
    {
        [Key]
        public Guid IdRefeicao { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(60)")]
        [Required(ErrorMessage = "O Nome é obrigatório!")]
        public string? NomeRefeicao { get; set; }


        [ForeignKey("IdUsuario")]
        public Usuario? Usuario { get; set; }
        public Guid IdUsuario { get; set; }

    }
}
