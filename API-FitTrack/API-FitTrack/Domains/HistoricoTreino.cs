using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class HistoricoTreino
{
    public Guid IdHistoricoTreino { get; set; }

    public DateOnly Data { get; set; }

    public string? Observacao { get; set; }

    public Guid UsuarioIdUsuario { get; set; }

    public Guid TreinoExercicioIdTreinoExercicio { get; set; }

    public virtual TreinoExercicio TreinoExercicioIdTreinoExercicioNavigation { get; set; } = null!;

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
