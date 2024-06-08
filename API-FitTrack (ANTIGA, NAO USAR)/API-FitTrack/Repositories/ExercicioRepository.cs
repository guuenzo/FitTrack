using System;
using System.Collections.Generic;
using System.Linq;
using API_FitTrack.Contexts;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_FitTrack.Repositories
{
    public class ExercicioRepository : IExercicioRepository
    {
        private readonly FitTrackBdContext _context;

        public ExercicioRepository(FitTrackBdContext context)
        {
            _context = context;
        }

        public void Cadastrar(Exercicio exercicio)
        {
            _context.Exercicios.Add(exercicio);
            _context.SaveChanges();
        }

        public Exercicio BuscarPorId(Guid id)
        {
            return _context.Exercicios
                .Include(e => e.TreinoExercicios)
                .ThenInclude(te => te.TreinoIdTreinoNavigation)
                .FirstOrDefault(e => e.IdExercicio == id);
        }

        public void Atualizar(Exercicio exercicio)
        {
            _context.Exercicios.Update(exercicio);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var exercicio = _context.Exercicios.Find(id);
            if (exercicio != null)
            {
                _context.Exercicios.Remove(exercicio);
                _context.SaveChanges();
            }
        }

        public List<Exercicio> ListarTodos()
        {
            return _context.Exercicios
                .Include(e => e.TreinoExercicios)
                .ThenInclude(te => te.TreinoIdTreinoNavigation)
                .ToList();
        }
    }
}
