using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Alimento
{
    public Guid IdAlimento { get; set; }

    public string NomeAlimento { get; set; } = null!;

    public int Calorias { get; set; }

    public decimal? Proteinas { get; set; }

    public decimal? Carboidratos { get; set; }

    public decimal? Gorduras { get; set; }

    public Guid DietaIdDieta { get; set; }

    public virtual Dieta DietaIdDietaNavigation { get; set; } = null!;
}
