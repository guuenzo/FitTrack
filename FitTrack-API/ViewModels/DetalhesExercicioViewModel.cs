using System.ComponentModel.DataAnnotations.Schema;

namespace FitTrack_API.ViewModels
{
    public class DetalhesExercicioViewModel
    {

        public Guid IdDetalhesExercicio { get; set; }
        //public Guid IdExercicio { get; set; }
        //public Guid IdUsuario { get; set; }

        public int? Series { get; set; }

        public int? Repeticoes { get; set; }

        public decimal? Carga { get; set; }
    }
}
