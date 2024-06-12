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



        public void Cadastrar(Treino treino)
        {
            _context.Treino.Add(treino);
            _context.SaveChanges();
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
            var treinosExercicios = _context.TreinoExercicio
                .Include(x => x.Treino)
                .Include(x => x.Exercicio)
                .Where(x => x.Treino!.IdUsuario == idUsuario)
                .ToList();

            if (treinosExercicios.Count == 0)
            {
                throw new Exception("Nenhuma treino encontrado!");
            }

            var treinos = treinosExercicios
                .GroupBy(x => new { x.Treino!.IdTreino, x.Treino.NomeTreino, x.Treino.IdUsuario })
                .Select(g => new TreinoViewModel
                {
                    IdTreino = g.Key.IdTreino,
                    NomeTreino = g.Key.NomeTreino.ToString(),
                    IdUsuario = g.Key.IdUsuario,
                    Exercicios = g.Select(a => new ExercicioViewModel
                    {
                        idExercicio = a.Exercicio!.IdExercicio,
                        NomeExercicio = a.Exercicio.NomeExercicio,
                        Descricao = a.Exercicio.Descricao,
                        Repeticoes = a.Exercicio.Repeticoes,
                        Series = a.Exercicio.Series,
                        Carga = a.Exercicio.Carga,
                        
                    }).ToList()
                }).ToList();

            return treinos;
        }
    }
}
