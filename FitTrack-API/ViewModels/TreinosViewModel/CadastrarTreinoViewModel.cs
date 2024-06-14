using API_FitTrack.Domains;
using FitTrack_API.ViewModels.ExerciciosViewModel;

namespace FitTrack_API.ViewModels.TreinosViewModel
{
    public class CadastrarTreinoViewModel
    {

        public Guid IdUsuario { get; set; }
        public List<CadastrarExercicioViewModel> ListaIdExercicios { get; set; } = [];
    }
}
