using System;
using System.Collections.Generic;
using System.Linq;

using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Contexts;
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
    }
}
