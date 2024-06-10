using API_FitTrack.Domains;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace FitTrack_API.Repositories
{
    public class RefeicaoRepository : IRefeicaoRepository
    {
        private readonly FitTrackContext ctx;

        public RefeicaoRepository(FitTrackContext context)
        {
            ctx = context;
        }


        public void AtualizarRefeicao(Guid idRefeicao, RefeicaoViewModel RefeicaoViewModel)
        {
            RefeicaoViewModel refeicaoBuscada = BuscarRefeicaoPorId(idRefeicao);

            refeicaoBuscada.NomeRefeicao = RefeicaoViewModel.NomeRefeicao;

            //ctx.Refeicao.Update(refeicaoBuscada);
            ctx.SaveChanges();
        }

        public RefeicaoViewModel BuscarRefeicaoPorId(Guid id)
        {
            var refeicaoAlimentos = ctx.RefeicaoAlimento
                .Include(x => x.Refeicao)
                .Include(x => x.Alimento)
                .Where(x => x.IdRefeicao == id)
                .ToList();

            if (refeicaoAlimentos.Count == 0)
            {
                throw new Exception("Nenhuma refeição encontrada!");
            }

            var refeicao = refeicaoAlimentos
                .GroupBy(x => new { x.Refeicao!.IdRefeicao, x.Refeicao.NomeRefeicao, x.Refeicao.IdUsuario })
                .Select(g => new RefeicaoViewModel
                {
                    IdRefeicao = g.Key.IdRefeicao,
                    NomeRefeicao = g.Key.NomeRefeicao,
                    IdUsuario = g.Key.IdUsuario,
                    Alimentos = g.Select(a => new AlimentoViewModel
                    {
                        IdAlimento = a.Alimento!.IdAlimento,
                        NomeAlimento = a.Alimento.NomeAlimento,
                        Peso = a.Alimento.Peso,
                        Proteinas = a.Alimento.Proteinas,
                        Calorias = a.Alimento.Calorias,
                        Carboidratos = a.Alimento.Carboidratos,
                        Gorduras = a.Alimento.Gorduras
                    }).ToList()
                })
                .FirstOrDefault();

            return refeicao!;
        }


        public void CadastrarRefeicao(RefeicaoViewModel refeicaoViewModel)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    // Create a new Refeicao entity
                    Refeicao refeicao = new()
                    {
                        NomeRefeicao = refeicaoViewModel.NomeRefeicao,
                        IdUsuario = refeicaoViewModel.IdUsuario
                    };

                    // Add the Refeicao entity to the context
                    ctx.Refeicao.Add(refeicao);
                    ctx.SaveChanges();

                    // Create and add Alimento entities, and create RefeicaoAlimento associations
                    foreach (var alimentoViewModel in refeicaoViewModel.Alimentos)
                    {
                        Alimento alimento = new()
                        {
                            NomeAlimento = alimentoViewModel.NomeAlimento,
                            Peso = alimentoViewModel.Peso,
                            Proteinas = alimentoViewModel.Proteinas,
                            Calorias = alimentoViewModel.Calorias,
                            Carboidratos = alimentoViewModel.Carboidratos,
                            Gorduras = alimentoViewModel.Gorduras
                        };

                        ctx.Alimento.Add(alimento);
                        ctx.SaveChanges();

                        RefeicaoAlimento refeicaoAlimento = new()
                        {
                            IdRefeicao = refeicao.IdRefeicao,
                            IdAlimento = alimento.IdAlimento
                        };
                        ctx.RefeicaoAlimento.Add(refeicaoAlimento);
                    }

                    // Save all changes to the context
                    ctx.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }


        public void ExcluirRefeicao(Guid idRefeicao)
        {
            Refeicao refeicao = ctx.Refeicao.FirstOrDefault(x => x.IdRefeicao == idRefeicao)! ?? throw new Exception("Nenhuma refeição encontrada!");

            RefeicaoAlimento refeicaoAlimento = ctx.RefeicaoAlimento.Include(x => x.Refeicao).FirstOrDefault(x => x.IdRefeicao == idRefeicao)! ?? throw new Exception("Nenhuma RefeiçãoAlimento encontrada!");

            ctx.Refeicao.Remove(refeicao);
            ctx.RefeicaoAlimento.Remove(refeicaoAlimento);

            ctx.SaveChanges();
        }

        public List<RefeicaoViewModel> ListarRefeicoesDoUsuario(Guid idUsuario)
        {
            var refeicoesAlimentos = ctx.RefeicaoAlimento
                .Include(x => x.Refeicao)
                .Include(x => x.Alimento)
                .Where(x => x.Refeicao!.IdUsuario == idUsuario)
                .ToList();

            if (refeicoesAlimentos.Count == 0)
            {
                throw new Exception("Nenhuma dieta encontrada!");
            }

            var refeicoes = refeicoesAlimentos
                .GroupBy(x => new { x.Refeicao!.IdRefeicao, x.Refeicao.NomeRefeicao, x.Refeicao.IdUsuario })
                .Select(g => new RefeicaoViewModel
                {
                    IdRefeicao = g.Key.IdRefeicao,
                    NomeRefeicao = g.Key.NomeRefeicao,
                    IdUsuario = g.Key.IdUsuario,
                    Alimentos = g.Select(a => new AlimentoViewModel
                    {
                        IdAlimento = a.Alimento!.IdAlimento,
                        NomeAlimento = a.Alimento.NomeAlimento,
                        Peso = a.Alimento.Peso,
                        Proteinas = a.Alimento.Proteinas,
                        Calorias = a.Alimento.Calorias,
                        Carboidratos = a.Alimento.Carboidratos,
                        Gorduras = a.Alimento.Gorduras
                    }).ToList()
                }).ToList();

            return refeicoes;
        }

    }
}
