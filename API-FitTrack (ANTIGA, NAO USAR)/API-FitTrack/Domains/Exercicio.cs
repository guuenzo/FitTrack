using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Exercicio
{
    public Guid IdExercicio { get; set; } = Guid.NewGuid();

    public string NomeExercicio { get; set; } = null!;

    public string? Descricao { get; set; }

    public string GrupoMuscular { get; set; } = null!;

    public string? VideoExecucao { get; set; }

    public int Repeticoes { get; set; }

    public decimal Carga { get; set; }

    public int Series { get; set; }

    public string? FotoExercicio { get; set; }

    public virtual ICollection<TreinoExercicio> TreinoExercicios { get; set; } = new List<TreinoExercicio>();
}
