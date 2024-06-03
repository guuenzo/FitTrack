﻿using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Dietum
{
    public Guid IdDieta { get; set; }

    public string NomeDieta { get; set; } = null!;

    public string? Descricao { get; set; }

    public string Objetivo { get; set; } = null!;

    public DateOnly DataCriacao { get; set; }

    public Guid UsuarioIdUsuario { get; set; }

    public virtual ICollection<Alimento> Alimentos { get; set; } = new List<Alimento>();

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
