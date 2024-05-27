using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class DietaAlimento
{
    public Guid IdDietaAlimento { get; set; }

    public decimal Quantidade { get; set; }

    public string Refeicao { get; set; } = null!;

    public Guid DietaIdDieta { get; set; }

    public Guid AlimentoIdAlimento { get; set; }

    public virtual Alimento AlimentoIdAlimentoNavigation { get; set; } = null!;

    public virtual Dieta DietaIdDietaNavigation { get; set; } = null!;
}
