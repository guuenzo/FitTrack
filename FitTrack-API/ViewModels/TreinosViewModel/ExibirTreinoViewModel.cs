using FitTrack_API.Domains;
using FitTrack_API.ViewModels.ExerciciosViewModel;

namespace FitTrack_API.ViewModels.TreinosViewModel
{
    public class ExibirTreinoViewModel
    {
        public Guid IdTreino { get; set; }
        public char LetraNomeTreino { get; set; }
        public Guid IdUsuario { get; set; }
        public List<ExibirExercicioViewModel>? Exercicios { get; set; }

        public List<GrupoMuscular>? ListaGruposMusculares { get; set; }
    }
}