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

    public int Repeticoes { get; set; }

    public decimal Carga { get; set; }

    public int Series { get; set; }

    public Guid TreinoIdTreino { get; set; }

    public virtual Medium MediaIdMediaNavigation { get; set; } = null!;

    public virtual Treino TreinoIdTreinoNavigation { get; set; } = null!;
}
