using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class TreinoExercicio
{
    public Guid IdTreinoExercicio { get; set; }

    public int Repeticoes { get; set; }

    public decimal Carga { get; set; }

    public int Series { get; set; }

    public Guid TreinoIdTreino { get; set; }

    public Guid ExercicioIdExercicio { get; set; }

    public virtual Exercicio ExercicioIdExercicioNavigation { get; set; } = null!;

    public virtual Treino TreinoIdTreinoNavigation { get; set; } = null!;
}
