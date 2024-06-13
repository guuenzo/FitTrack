using System;
using System.Collections.Generic;
using System.Linq;

using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Contexts;
using FitTrack_API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace API_FitTrack.Repositories
{
    public class TreinoRepository : ITreinoRepository
    {
        private readonly FitTrackContext _context;

        public TreinoRepository(FitTrackContext context)
        {
            _context = context;
        }



        public void Cadastrar(TreinoViewModel treinoViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {

                    Treino treino = new()
                    {
                        IdUsuario = treinoViewModel.IdUsuario,

                    };

                    List<TreinoExercicio> treinoExerciciosASeremAdicionados = [];

                    foreach (var exercicio in treinoViewModel.Exercicios)
                    {
                        TreinoExercicio treinoExercicio = new()
                        {
                            IdTreino = treino.IdTreino,
                            IdExercicio = exercicio.IdExercicio,
                        };


                        treinoExerciciosASeremAdicionados.Add(treinoExercicio);

                    }
                    _context.Treino.Add(treino);
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

        public void Atualizar(Treino treino)
        {
            _context.Treino.Update(treino);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var treino = _context.Treino.Find(id);
            if (treino != null)
            {
                _context.Treino.Remove(treino);
                _context.SaveChanges();
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
