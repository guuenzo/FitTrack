using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class HistoricoExercicio
{
    public Guid IdHistoricoExercicio { get; set; }

    public int Repeticoes { get; set; }

    public int Series { get; set; }

    public decimal Carga { get; set; }

    public Guid UsuarioIdUsuario { get; set; }

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
