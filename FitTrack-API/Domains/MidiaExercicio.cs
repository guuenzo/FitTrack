using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("MidiaExercicio")]
    public class MidiaExercicio
    {
        [Key]
        public Guid IdMidiaExercicio { get; set; } = Guid.NewGuid();

        [Column(TypeName = "TEXT")]
        public string? BlobNameVideoExercicio { get; set; }

        [Column(TypeName = "TEXT")]
        public string? VideoExercicio { get; set; }
    }
}
