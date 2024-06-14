using API_FitTrack.Domains;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels;
using FitTrack_API.ViewModels.AlimentosViewModel;
using FitTrack_API.ViewModels.RefeicoesViewModel;
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


        public void AtualizarRefeicao(Guid idRefeicao, AtualizarRefeicaoViewModel atualizarRefeicaoViewModel)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {

                    Refeicao refeicaoBuscada = ctx.Refeicao.FirstOrDefault(x => x.IdRefeicao == idRefeicao)! ?? throw new Exception("Nenhuma refeição encontrada!");

                    refeicaoBuscada.NomeRefeicao = atualizarRefeicaoViewModel.NomeRefeicao;

                    if (atualizarRefeicaoViewModel.NomeRefeicao!.Trim() == "")
                    {
                        throw new Exception("Dê um nome a refeição!");
                    }

                    ExibirRefeicaoViewModel refeicao = BuscarRefeicaoPorId(idRefeicao);

                    foreach (var item in atualizarRefeicaoViewModel.Alimentos)
                    {
                        if (item.Proteinas + item.Carboidratos + item.Gorduras > item.Peso)
                        {
                            throw new Exception("O macro não pode ser maior que o peso do alimento!");
                        }
                    }


                    // Atualiza os campos da refeição
                    refeicao.NomeRefeicao = atualizarRefeicaoViewModel.NomeRefeicao;

                    // Remove os alimentos antigos
                    List<RefeicaoAlimento> refeicaoAlimentosExistentes = ctx.RefeicaoAlimento.Where(ra => ra.IdRefeicao == idRefeicao).ToList();
                    ctx.RefeicaoAlimento.RemoveRange(refeicaoAlimentosExistentes);

                    foreach (var item in refeicaoAlimentosExistentes)
                    {

                        ctx.Alimento.RemoveRange(item.Alimento!);
                    }


                    // Adiciona os novos alimentos
                    foreach (var alimentoViewModel in atualizarRefeicaoViewModel.Alimentos)
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

                    ctx.Refeicao.Update(refeicaoBuscada);

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


        public ExibirRefeicaoViewModel BuscarRefeicaoPorId(Guid id)
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

            ExibirRefeicaoViewModel refeicao = refeicaoAlimentos
                .GroupBy(x => new { x.Refeicao!.IdRefeicao, x.Refeicao.NomeRefeicao, x.Refeicao.IdUsuario })
                .Select(g => new ExibirRefeicaoViewModel
                {
                    IdRefeicao = g.Key.IdRefeicao,
                    NomeRefeicao = g.Key.NomeRefeicao,
                    IdUsuario = g.Key.IdUsuario,
                    Alimentos = g.Select(a => new ExibirAlimentoViewModel
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
                .FirstOrDefault()!;

            return refeicao!;
        }


        public void CadastrarRefeicao(CadastrarRefeicaoViewModel cadastrarRefeicaoViewModel)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    if (cadastrarRefeicaoViewModel.Alimentos.Count == 0)
                    {
                        throw new Exception("Adicione alimentos a refeição!");
                    }

                    if (cadastrarRefeicaoViewModel.NomeRefeicao!.Trim() == "")
                    {
                        throw new Exception("Dê um nome a refeição!");
                    }

                    foreach (var item in cadastrarRefeicaoViewModel.Alimentos)
                    {
                        if (item.Proteinas + item.Carboidratos + item.Gorduras > item.Peso)
                        {
                            throw new Exception("O macro não pode ser maior que o peso do alimento!");
                        }
                    }

                    // Create a new Refeicao entity
                    Refeicao refeicao = new()
                    {
                        NomeRefeicao = cadastrarRefeicaoViewModel.NomeRefeicao,
                        IdUsuario = cadastrarRefeicaoViewModel.IdUsuario
                    };

                    // Add the Refeicao entity to the context
                    ctx.Refeicao.Add(refeicao);
                    ctx.SaveChanges();

                    List<Alimento> alimentosASeremCadastrados = [];

                    List<RefeicaoAlimento> refeicaoAlimentosASeremCadastrados = [];

                    // Create and add Alimento entities, and create RefeicaoAlimento associations
                    foreach (var alimentoViewModel in cadastrarRefeicaoViewModel.Alimentos)
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

                        alimentosASeremCadastrados.Add(alimento);


                        RefeicaoAlimento refeicaoAlimento = new()
                        {
                            IdRefeicao = refeicao.IdRefeicao,
                            IdAlimento = alimento.IdAlimento
                        };

                        refeicaoAlimentosASeremCadastrados.Add(refeicaoAlimento);

                    }
                    ctx.Alimento.AddRange(alimentosASeremCadastrados);
                    ctx.RefeicaoAlimento.AddRange(refeicaoAlimentosASeremCadastrados);
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

        public List<ExibirRefeicaoViewModel> ListarRefeicoesDoUsuario(Guid idUsuario)
        {
            List<RefeicaoAlimento> refeicoesAlimentos = ctx.RefeicaoAlimento
                .Include(x => x.Refeicao)
                .Include(x => x.Alimento)
                .Where(x => x.Refeicao!.IdUsuario == idUsuario)
                .OrderBy(x => x.Alimento!.Calorias)
                .ToList();

            if (refeicoesAlimentos.Count == 0)
            {
                throw new Exception("Nenhuma dieta encontrada!");
            }

            List<ExibirRefeicaoViewModel> refeicoes = refeicoesAlimentos
                .GroupBy(x => new { x.Refeicao!.IdRefeicao, x.Refeicao.NomeRefeicao, x.Refeicao.IdUsuario })
                .Select(g => new ExibirRefeicaoViewModel
                {
                    IdRefeicao = g.Key.IdRefeicao,
                    NomeRefeicao = g.Key.NomeRefeicao,
                    IdUsuario = g.Key.IdUsuario,
                    Alimentos = g.Select(a => new ExibirAlimentoViewModel
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
