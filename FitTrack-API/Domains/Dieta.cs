using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Dieta
{
    public Guid IdDieta { get; set; } = Guid.NewGuid();

    public string NomeDieta { get; set; } = null!;

    public Guid UsuarioIdUsuario { get; set; }

    public decimal? TotalCalorias { get; set; }

    public decimal? TotalGorduras { get; set; }

    public decimal? TotalProteinas { get; set; }

    public decimal? TotalCarboidratos { get; set; }

    public virtual ICollection<DietaAlimento> DietaAlimentos { get; set; } = new List<DietaAlimento>();

    public virtual Usuario UsuarioIdUsuarioNavigation { get; set; } = null!;
}
