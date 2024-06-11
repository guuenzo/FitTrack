using API_FitTrack.Domains;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.Domains
{
    [Table("RefeicaoAlimento")]
    public class RefeicaoAlimento
    {
        [Key]
        public Guid IdRefeicaoAlimento { get; set; }


        [ForeignKey("IdRefeicao")]
        public Refeicao? Refeicao { get; set; }
        public Guid IdRefeicao { get; set; }

        [ForeignKey("IdAlimento")]
        public Alimento? Alimento { get; set; }
        public Guid IdAlimento { get; set; }



    }
}
