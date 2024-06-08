using System;
using System.Collections.Generic;
using System.Linq;
using API_FitTrack.Contexts;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_FitTrack.Repositories
{
    public class TreinoRepository : ITreinoRepository
    {
        private readonly FitTrackBdContext _context;

        public TreinoRepository(FitTrackBdContext context)
        {
            _context = context;
        }

        public void Cadastrar(Treino treino)
        {
            _context.Treinos.Add(treino);
            _context.SaveChanges();
        }

        public Treino BuscarPorId(Guid id)
        {
            return _context.Treinos
                .Include(t => t.TreinoExercicios)
                .ThenInclude(te => te.ExercicioIdExercicioNavigation)
                .FirstOrDefault(t => t.IdTreino == id);
        }

        public void Atualizar(Treino treino)
        {
            _context.Treinos.Update(treino);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var treino = _context.Treinos.Find(id);
            if (treino != null)
            {
                _context.Treinos.Remove(treino);
                _context.SaveChanges();
            }
        }

        public List<Treino> ListarTodos()
        {
            return _context.Treinos
                .Include(t => t.TreinoExercicios)
                .ThenInclude(te => te.ExercicioIdExercicioNavigation)
                .ToList();
        }
    }
}
