using API_FitTrack.Domains;

namespace FitTrack_API.ViewModels
{
    public class TreinoViewModel
    {
        public Guid IdTreino { get; set; }
        public int IntNomeTreino { get; set; }
        public Guid IdUsuario { get; set; }
        public List<ExercicioViewModel> Exercicios { get; set; } = new List<ExercicioViewModel>();
    }
}
