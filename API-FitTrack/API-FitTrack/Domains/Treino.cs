using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Treino
{
    public Guid IdTreino { get; set; }

    public string NomeTreino { get; set; } = null!;

    public string Descricao { get; set; } = null!;

    public string NivelDificuldade { get; set; } = null!;

    public DateOnly DataCriacao { get; set; }

    public string Objetivo { get; set; } = null!;

    public Guid UsuarioIdUsuario { get; set; }

    public virtual ICollection<Exercicio> Exercicios { get; set; } = new List<Exercicio>();

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
