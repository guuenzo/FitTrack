using API_FitTrack.Domains;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels;

namespace FitTrack_API.Repositories
{
    public class DetalhesExercicioRepository : IDetalhesExercicioRepository
    {
        private readonly FitTrackContext _context;

        public DetalhesExercicioRepository(FitTrackContext context)
        {
            _context = context;
        }
        public void Atualizar(DetalhesExercicioViewModel detalhesExercicioViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    DetalhesExercicio detalhesExercicioBuscado = _context.DetalhesExercicio.FirstOrDefault(x => x.IdDetalhesExercicio == detalhesExercicioViewModel.IdDetalhesExercicio)! ?? throw new Exception("Detalhes não encontrados!");

                    if (detalhesExercicioViewModel.Carga.HasValue)
                    {
                        detalhesExercicioBuscado.Carga = detalhesExercicioViewModel.Carga;
                    }

                    if (detalhesExercicioViewModel.Series.HasValue)
                    {
                        detalhesExercicioBuscado.Series = detalhesExercicioViewModel.Series;
                    }

                    if (detalhesExercicioViewModel.Repeticoes.HasValue)
                    {
                        detalhesExercicioBuscado.Repeticoes = detalhesExercicioViewModel.Repeticoes;
                    }

                    _context.DetalhesExercicio.Update(detalhesExercicioBuscado);

                    _context.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception e)
                {

                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception(e.Message);

                }
            }
        }
    }
}
