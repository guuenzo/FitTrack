using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_FitTrack.Domains
{
    [Table("TreinoExercicio")]
    public partial class TreinoExercicio
    {
        [Key]
        public Guid IdTreinoExercicio { get; set; } = Guid.NewGuid();

        [ForeignKey("IdTreino")]
        public Treino? Treino { get; set; }
        public Guid IdTreino { get; set; }



        [ForeignKey("IdExercicio")]
        public Exercicio? Exercicio { get; set; }
        public Guid IdExercicio { get; set; }

        public TreinoExercicio()
        {
            IdTreinoExercicio = IdTreino;
        }

    }
}
