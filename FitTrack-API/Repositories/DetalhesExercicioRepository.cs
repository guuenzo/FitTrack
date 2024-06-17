using API_FitTrack.Domains;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels.DetalhesExercicioViewModel;

namespace FitTrack_API.Repositories
{
    public class DetalhesExercicioRepository(FitTrackContext context) : IDetalhesExercicioRepository
    {
        private readonly FitTrackContext _context = context;

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

        public DetalhesExercicioViewModel ListarDetalhesDeUmExercicio(Guid idUsuario, Guid idExercicio)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    DetalhesExercicio detalhesExercicio = _context.DetalhesExercicio.FirstOrDefault(x => x.IdUsuario == idUsuario && x.IdExercicio == idExercicio)! ?? throw new Exception("Detalhes não encontrados!") ?? throw new Exception("Nada encontrado!");

                    DetalhesExercicioViewModel detalhesExercicioViewModel = new()
                    {
                        IdDetalhesExercicio = detalhesExercicio.IdDetalhesExercicio,
                        Carga = detalhesExercicio.Carga,
                        Repeticoes = detalhesExercicio.Repeticoes,
                        Series = detalhesExercicio.Series,
                    };

                    return detalhesExercicioViewModel;


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
