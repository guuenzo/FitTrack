using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class DietaAlimento
{
    public Guid DietaIdDieta { get; set; } = Guid.NewGuid();

    public Guid AlimentoIdAlimento { get; set; }

    public Guid IdDietaAlimento { get; set; }

    public virtual Alimento AlimentoIdAlimentoNavigation { get; set; } = null!;

    public virtual Dieta DietaIdDietaNavigation { get; set; } = null!;
}
