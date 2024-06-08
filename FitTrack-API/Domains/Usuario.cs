using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Usuario
{
    public Guid IdUsuario { get; set; } = Guid.NewGuid();

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Senha { get; set; }

    //public DateOnly? DataNascimento { get; set; }

    public decimal? Peso { get; set; }

    public decimal? Altura { get; set; }

    public string? GoogleIdAccount { get; set; }

    public string? Status { get; set; }

    public int? CodigoRecuperacaoSenha { get; set; }

    public string? Foto { get; set; }
    public string? BlobNameFoto { get; set; }

    public virtual ICollection<Dieta> Dieta { get; set; } = new List<Dieta>();

    public virtual ICollection<Treino> Treinos { get; set; } = new List<Treino>();
}
