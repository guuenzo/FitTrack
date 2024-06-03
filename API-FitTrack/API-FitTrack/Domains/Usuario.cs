using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Usuario
{
    public Guid IdUsuario { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Senha { get; set; }

    public DateOnly? DataNascimento { get; set; }

    public string Sexo { get; set; } = null!;

    public decimal Peso { get; set; }

    public decimal Altura { get; set; }

    public string? GoogleIdAccount { get; set; }

    public string? Status { get; set; }

    public string? CodigoRecuperacaoSenha { get; set; }

    public Guid MediaIdMedia { get; set; }

    public virtual ICollection<Dietum> Dieta { get; set; } = new List<Dietum>();

    public virtual Medium MediaIdMediaNavigation { get; set; } = null!;

    public virtual ICollection<Treino> Treinos { get; set; } = new List<Treino>();
}
