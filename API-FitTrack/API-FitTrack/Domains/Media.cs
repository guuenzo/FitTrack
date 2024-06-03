using System;
using System.Collections.Generic;

namespace API_FitTrack.Domains;

public partial class Media
{
    public Guid IdMedia { get; set; }

    public string Uri { get; set; } = null!;

    public string BlobName { get; set; } = null!;

    public virtual Exercicio? Exercicio { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
