using FitTrack_API.Domains;
using FitTrack_API.ViewModels;

namespace FitTrack_API.Interfaces
{
    public interface IDetalhesExercicioRepository
    {
        void Atualizar(DetalhesExercicioViewModel detalhesExercicioViewModel);
    }
}
