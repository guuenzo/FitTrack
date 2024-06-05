using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Treino
{
    public Guid IdTreino { get; set; }

    public string NomeTreino { get; set; } = null!;

    public Guid UsuarioIdUsuario { get; set; }

    public virtual ICollection<TreinoExercicio> TreinoExercicios { get; set; } = new List<TreinoExercicio>();

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
