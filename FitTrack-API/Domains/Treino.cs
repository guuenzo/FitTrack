using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_FitTrack.Domains
{
    [Table("Treino")]
    public partial class Treino
    {
        [Key]
        public Guid IdTreino { get; set; } = Guid.NewGuid();

        [Column(TypeName = "INT")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? IntNomeTreino { get; set; }



        [ForeignKey("IdUsuario")]
        public Usuario? Usuario { get; set; }
        public Guid IdUsuario { get; set; }

    }
}
