using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.Utils;
using FitTrack_API.ViewModels.ExerciciosViewModel;
using FitTrack_API.ViewModels.TreinosViewModel;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Signers;

namespace API_FitTrack.Repositories
{
    public class TreinoRepository : ITreinoRepository
    {
        private readonly FitTrackContext _context;

        public TreinoRepository(FitTrackContext context)
        {
            _context = context;
        }




        /// <summary>
        /// Só precisa passar o idUsuario e o id de cada exercicio dentro de um objeto no array 
        /// </summary>
        /// <param name="treinoViewModel"></param>
        /// <exception cref="Exception"></exception>
        public void Cadastrar(CadastrarTreinoViewModel treinoViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    List<TreinoExercicio> treinoExerciciosASeremAdicionados = [];
                    List<DetalhesExercicio> detalhesExercicioASeremAdicionados = [];

                    List<Treino> treinosBuscados = _context.Treino.Where(x => x.IdUsuario == treinoViewModel.IdUsuario).ToList()
                        //?? throw new Exception("Nenhum treino encontrado!")
                        ;

                    GlobalFunctions.ValidarListaDeExerciciosSeTemDuplicados(treinoViewModel.ListaIdExercicios);

                    Treino novoTreino = new()
                    {
                        IdUsuario = treinoViewModel.IdUsuario,
                        //SWITCH CASE SIMPLIFICADO
                        LetraNomeTreino = treinosBuscados.Count switch
                        {
                            1 => 'B',
                            2 => 'C',
                            3 => 'D',
                            4 => 'E',
                            5 => 'F',
                            6 => throw new Exception("Já existem 6 treinos "),
                            _ => 'A',
                        }
                    };

                    foreach (var exercicio in treinoViewModel.ListaIdExercicios)
                    {
                        TreinoExercicio treinoExercicio = new()
                        {
                            IdTreino = novoTreino.IdTreino,
                            IdExercicio = exercicio.IdExercicio,
                        };

                        DetalhesExercicio detalhesExercicio = new()
                        {
                            IdExercicio = exercicio.IdExercicio,
                            IdUsuario = treinoViewModel.IdUsuario,
                        };

                        treinoExerciciosASeremAdicionados.Add(treinoExercicio);
                        detalhesExercicioASeremAdicionados.Add(detalhesExercicio);
                    }
                    _context.DetalhesExercicio.AddRange(detalhesExercicioASeremAdicionados);
                    _context.Treino.Add(novoTreino);
                    _context.TreinoExercicio.AddRange(treinoExerciciosASeremAdicionados);
                    _context.SaveChanges();



                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception(ex.Message);
                }
            }
        }

        public ExibirTreinoViewModel BuscarPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Atualizar(Guid idTreino, AtualizarTreinoViewModel atualizarTreinoViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Valida se há exercícios duplicados na lista
                    GlobalFunctions.ValidarListaDeExerciciosSeTemDuplicados(atualizarTreinoViewModel.ListaExercicios);

                    // Busca os registros atuais de TreinoExercicio e DetalhesExercicio para o treino especificado
                    List<TreinoExercicio> treinoExercicioExistente = _context.TreinoExercicio
                        .Include(te => te.Treino)
                        .Include(te => te.Exercicio)
                        .Where(te => te.IdTreino == idTreino)
                        .ToList();

                    List<DetalhesExercicio> detalhesExercicioExistente = _context.DetalhesExercicio
                        .Where(de => de.IdUsuario == treinoExercicioExistente.FirstOrDefault()!.Treino!.IdUsuario)
                        .ToList();

                    // Determina os exercícios a serem mantidos e removidos
                    var idsExerciciosExistentes = treinoExercicioExistente.Select(te => te.IdExercicio).ToList();
                    var idsExerciciosNovos = atualizarTreinoViewModel.ListaExercicios.Select(e => e.IdExercicio).ToList();

                    var idsExerciciosParaRemover = idsExerciciosExistentes.Except(idsExerciciosNovos).ToList();
                    var idsExerciciosParaAdicionar = idsExerciciosNovos.Except(idsExerciciosExistentes).ToList();

                    // Remove os TreinoExercicio e DetalhesExercicio que não são mais necessários
                    List<TreinoExercicio> treinoExercicioParaRemover = treinoExercicioExistente
                        .Where(te => idsExerciciosParaRemover.Contains(te.IdExercicio))
                        .ToList();

                    List<DetalhesExercicio> detalhesExercicioParaRemover = detalhesExercicioExistente
                        .Where(de => idsExerciciosParaRemover.Contains(de.IdExercicio))
                        .ToList();

                    _context.TreinoExercicio.RemoveRange(treinoExercicioParaRemover);
                    _context.DetalhesExercicio.RemoveRange(detalhesExercicioParaRemover);

                    // Adiciona novos TreinoExercicio e DetalhesExercicio
                    var treinoExercicioParaAdicionar = idsExerciciosParaAdicionar.Select(idExercicio => new TreinoExercicio
                    {
                        IdTreino = idTreino,
                        IdExercicio = idExercicio
                    }).ToList();

                    List<DetalhesExercicio> detalhesExercicioParaAdicionar = idsExerciciosParaAdicionar.Select(idExercicio => new DetalhesExercicio
                    {
                        IdExercicio = idExercicio,
                        IdUsuario = treinoExercicioExistente.First().Treino!.IdUsuario,

                    }).ToList();

                    _context.TreinoExercicio.AddRange(treinoExercicioParaAdicionar);
                    _context.DetalhesExercicio.AddRange(detalhesExercicioParaAdicionar);

                    _context.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception("Erro ao atualizar os exercícios do treino: " + ex.Message);
                }
            }
        }


        public void Deletar(Guid id)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Treino treino = _context.Treino.FirstOrDefault(t => t.IdTreino == id)! ?? throw new Exception("Nenhum treino encontrado");
                    TreinoExercicio treinoExercicio = _context.TreinoExercicio.FirstOrDefault(t => t.IdTreino == id)! ?? throw new Exception("Nenhum treinoExercicio encontrado");

                    List<DetalhesExercicio> detalhesExercicio = _context.DetalhesExercicio.Where(x => x.IdExercicio == treinoExercicio.IdExercicio && x.IdUsuario == treino.IdUsuario).ToList()! ?? throw new Exception("Nenhum detalhe encontrado");


                    _context.DetalhesExercicio.RemoveRange(detalhesExercicio);
                    _context.Treino.Remove(treino);
                    _context.TreinoExercicio.Remove(treinoExercicio);
                    _context.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception("Erro ao excluir exercício.", ex);
                }
            }
        }

        public List<ExibirTreinoViewModel> ListarTodosOsTreinosDoUsuario(Guid idUsuario)
        {
            List<TreinoExercicio> treinoExercicioBuscado = _context.TreinoExercicio
                .Include(te => te.Treino)
                .Include(te => te.Exercicio)
                .ThenInclude(e => e.MidiaExercicio)
                .Include(te => te.Exercicio)
                .ThenInclude(e => e.GrupoMuscular)
                .Where(te => te.Treino!.IdUsuario == idUsuario).OrderBy(x => x.Treino!.LetraNomeTreino)
                .ToList();

            if (treinoExercicioBuscado.Count == 0)
            {
                throw new Exception("Nenhum treino encontrado!");
            }

            List<ExibirTreinoViewModel> treinos = treinoExercicioBuscado
                .GroupBy(te => new { te.Treino!.IdTreino, te.Treino.LetraNomeTreino, te.Treino.IdUsuario })
                .Select(t =>
                {
                    var exercicios = t.Select(e => new ExibirExercicioViewModel
                    {
                        IdExercicio = e.IdExercicio,
                        NomeExercicio = e.Exercicio!.NomeExercicio,
                        Descricao = e.Exercicio.Descricao,
                        GrupoMuscular = e.Exercicio.GrupoMuscular != null
                            ? new GrupoMuscular
                            {
                                IdGrupoMuscular = e.Exercicio.GrupoMuscular.IdGrupoMuscular,
                                NomeGrupoMuscular = e.Exercicio.GrupoMuscular.NomeGrupoMuscular
                            }
                            : null,
                        MidiaExercicio = e.Exercicio.MidiaExercicio != null
                            ? new MidiaExercicio
                            {
                                IdMidiaExercicio = e.Exercicio.MidiaExercicio.IdMidiaExercicio,
                                VideoExercicio = e.Exercicio.MidiaExercicio.VideoExercicio
                            }
                            : null
                    }).ToList();

                    var gruposMusculares = new HashSet<GrupoMuscular>(exercicios
                        .Where(e => e.GrupoMuscular != null)
                        .Select(e => e.GrupoMuscular!));

                    return new ExibirTreinoViewModel
                    {
                        IdTreino = t.Key.IdTreino,
                        LetraNomeTreino = t.Key.LetraNomeTreino,
                        IdUsuario = t.Key.IdUsuario,
                        Exercicios = exercicios,
                        ListaGruposMusculares = gruposMusculares.ToList()
                    };
                }).ToList();

            return treinos;
        }


    }
}
