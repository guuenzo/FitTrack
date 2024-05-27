using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Progresso
{
    public Guid IdProgresso { get; set; }

    public DateOnly Data { get; set; }

    public decimal Peso { get; set; }

    public decimal PercentualGordura { get; set; }

    public decimal MassaMuscular { get; set; }

    public Guid UsuarioIdUsuario { get; set; }

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
