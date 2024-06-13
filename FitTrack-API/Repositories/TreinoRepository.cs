using System;
using System.Collections.Generic;
using System.Linq;

using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Contexts;
using FitTrack_API.ViewModels;
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

        public bool ExisteItemDuplicado<T>(List<T> lista)
        {
            Dictionary<T, int> dicionario = new();

            foreach (T item in lista)
            {
                if (dicionario.ContainsKey(item))
                {
                    return true; // Encontrado um item duplicado
                }
                else
                {
                    dicionario[item] = 1;
                }
            }

            return false; // Nenhum item duplicado encontrado
        }


        /// <summary>
        /// Só precisa passar o idUsuario e o id de cada exercicio dentro de um objeto no array 
        /// </summary>
        /// <param name="treinoViewModel"></param>
        /// <exception cref="Exception"></exception>
        public void Cadastrar(TreinoViewModel treinoViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    List<Treino> treinosBuscados = _context.Treino.Where(x => x.IdUsuario == treinoViewModel.IdUsuario).ToList() ?? throw new Exception("Nenhum treino encontrado!");

                    //armazena o id de todos os exercicios
                    List<Guid> idsExercicios = [];

                    foreach (var item in treinoViewModel.Exercicios)
                    {
                        idsExercicios.Add(item.IdExercicio);
                    }
                    //valida se tem algum exercicio duplicado
                    bool temExerciciosDuplicados = ExisteItemDuplicado(idsExercicios);

                    if (temExerciciosDuplicados)
                    {
                        throw new Exception("Há treinos duplicados!");
                    }

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



                    List<TreinoExercicio> treinoExerciciosASeremAdicionados = [];

                    foreach (var exercicio in treinoViewModel.Exercicios)
                    {
                        TreinoExercicio treinoExercicio = new()
                        {
                            IdTreino = novoTreino.IdTreino,
                            IdExercicio = exercicio.IdExercicio,
                        };


                        treinoExerciciosASeremAdicionados.Add(treinoExercicio);

                    }
                    _context.Treino.Add(novoTreino);
                    _context.TreinoExercicio.AddRange(treinoExerciciosASeremAdicionados);
                    _context.SaveChanges();



                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception("Erro ao cadastrar exercício.", ex);
                }
            }
        }

        public Treino BuscarPorId(Guid id)
        {
            return _context.Treino
                .FirstOrDefault(t => t.IdTreino == id)!;
        }

        public void Atualizar(Guid idTreino, List<ExercicioViewModel> exerciciosViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    List<TreinoExercicio> treinoExercicioBuscado = _context.TreinoExercicio.Include(x => x.Treino).Include(x => x.Exercicio).Where(t => t.IdTreino == idTreino).ToList()! ?? throw new Exception("Nenhum treino encontrado");

                    //armazena o id de todos os exercicios
                    List<Guid> idsExercicios = [];

                    foreach (var exercicioNovo in exerciciosViewModel)
                    {
                        idsExercicios.Add(exercicioNovo.IdExercicio);

                        foreach (var exercicioAntigo in treinoExercicioBuscado)
                        {
                            treinoExercicioBuscado.Remove(exercicioAntigo);
                        }

                    }
                    //valida se tem algum exercicio duplicado
                    bool temExerciciosDuplicados = ExisteItemDuplicado(idsExercicios);

                    if (temExerciciosDuplicados)
                    {
                        throw new Exception("Há treinos duplicados!");
                    }


                    //foreach (var exercicioNovo in exerciciosViewModel)
                    //{
                    //    foreach (var exercicioAntigo in treinoExercicioBuscado)
                    //    {
                    //        exercicioAntigo = exercicioNovo;
                    //    }
                    //}


                    _context.TreinoExercicio.UpdateRange(treinoExercicioBuscado);

                    _context.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception("Erro ao cadastrar exercício.", ex);
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

                    _context.Treino.Remove(treino);
                    _context.TreinoExercicio.Remove(treinoExercicio);
                    _context.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception ex)
                {

                    transaction.Rollback(); // Reverte a transação em caso de exceção
                    throw new Exception("Erro ao cadastrar exercício.", ex);
                }
            }
        }

        public List<Treino> ListarTodos()
        {
            return _context.Treino

                .ToList();
        }

        public List<TreinoViewModel> ListarTreinosDoUsuario(Guid idUsuario)
        {
            throw new NotImplementedException();
        }
    }
}
