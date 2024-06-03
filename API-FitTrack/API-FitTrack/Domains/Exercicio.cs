using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Exercicio
{
    public Guid IdExercicio { get; set; }

    public string NomeExercicio { get; set; } = null!;

    public string? Descricao { get; set; }

    public string GrupoMuscular { get; set; } = null!;

    public int? VideoExecucao { get; set; }

    public Guid MediaIdMedia { get; set; }

    public virtual Medium MediaIdMediaNavigation { get; set; } = null!;

    public virtual ICollection<TreinoExercicio> TreinoExercicios { get; set; } = new List<TreinoExercicio>();
}
