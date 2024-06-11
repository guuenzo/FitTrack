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


        public void AtualizarRefeicao(Guid idRefeicao, RefeicaoViewModel refeicaoViewModel)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    RefeicaoViewModel refeicao = BuscarRefeicaoPorId(idRefeicao);

                    foreach (var item in refeicaoViewModel.Alimentos)
                    {
                        if (item.Proteinas + item.Carboidratos + item.Gorduras > item.Peso)
                        {
                            throw new Exception("O macro não pode ser maior que o peso do alimento!");
                        }
                    }

                    // Atualiza os campos da refeição
                    refeicao.NomeRefeicao = refeicaoViewModel.NomeRefeicao;

                    // Remove os alimentos antigos
                    List<RefeicaoAlimento> refeicaoAlimentosExistentes = ctx.RefeicaoAlimento.Where(ra => ra.IdRefeicao == idRefeicao).ToList();
                    ctx.RefeicaoAlimento.RemoveRange(refeicaoAlimentosExistentes);

                    foreach (var item in refeicaoAlimentosExistentes)
                    {

                        ctx.Alimento.RemoveRange(item.Alimento!);
                    }


                    // Adiciona os novos alimentos
                    foreach (var alimentoViewModel in refeicaoViewModel.Alimentos)
                    {
                        Alimento novoAlimento = new()
                        {
                            NomeAlimento = alimentoViewModel.NomeAlimento,
                            Peso = alimentoViewModel.Peso,
                            Proteinas = alimentoViewModel.Proteinas,
                            Calorias = alimentoViewModel.Calorias,
                            Carboidratos = alimentoViewModel.Carboidratos,
                            Gorduras = alimentoViewModel.Gorduras
                        };

                        ctx.Alimento.Add(novoAlimento);
                        ctx.SaveChanges();

                        RefeicaoAlimento refeicaoAlimento = new()
                        {
                            IdRefeicao = idRefeicao,
                            IdAlimento = novoAlimento.IdAlimento
                        };

                        ctx.RefeicaoAlimento.Add(refeicaoAlimento);
                    }

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
                    if (refeicaoViewModel.Alimentos.Count == 0)
                    {
                        throw new Exception("Adicione alimentos a refeição!");
                    }

                    foreach (var item in refeicaoViewModel.Alimentos)
                    {
                        if (item.Proteinas + item.Carboidratos + item.Gorduras > item.Peso)
                        {
                            throw new Exception("O macro não pode ser maior que o peso do alimento!");
                        }
                    }

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
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {

                    Refeicao refeicao = ctx.Refeicao.FirstOrDefault(x => x.IdRefeicao == idRefeicao)! ?? throw new Exception("Nenhuma refeição encontrada2!");

                    List<RefeicaoAlimento> listaRefeicaoAlimento = ctx.RefeicaoAlimento.Include(x => x.Alimento).Include(x => x.Refeicao).Where(x => x.IdRefeicao == idRefeicao).ToList()! ?? throw new Exception("Nenhuma RefeiçãoAlimento encontrada3!");

                    List<Alimento> listAlimento = [];


                    foreach (var item in listaRefeicaoAlimento)
                    {
                        listAlimento.Add(item.Alimento!);
                    }

                    ctx.Alimento.RemoveRange(listAlimento);

                    ctx.Refeicao.Remove(refeicao);
                    ctx.RefeicaoAlimento.RemoveRange(listaRefeicaoAlimento);

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

        public List<RefeicaoViewModel> ListarRefeicoesDoUsuario(Guid idUsuario)
        {
            var refeicoesAlimentos = ctx.RefeicaoAlimento
                .Include(x => x.Refeicao)
                .Include(x => x.Alimento)
                .Where(x => x.Refeicao!.IdUsuario == idUsuario)
                .OrderBy(x => x.Alimento!.Calorias)
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
