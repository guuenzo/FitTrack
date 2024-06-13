using API_FitTrack.Domains;

namespace FitTrack_API.ViewModels
{
    public class TreinoViewModel
    {
        public Guid IdTreino { get; set; }
        public char LetraNomeTreino { get; set; }
        public Guid IdUsuario { get; set; }
        public List<ExercicioViewModel> Exercicios { get; set; } = new List<ExercicioViewModel>();
    }
}
