using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class TreinoExercicio
{
    public Guid TreinoIdTreino { get; set; } = Guid.NewGuid();

    public Guid ExercicioIdExercicio { get; set; }

    public Guid IdTreinoExercicio { get; set; }

    public virtual Exercicio ExercicioIdExercicioNavigation { get; set; } = null!;

    public virtual Treino TreinoIdTreinoNavigation { get; set; } = null!;
}
