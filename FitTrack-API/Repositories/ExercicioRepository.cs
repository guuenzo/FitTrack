using System;
using System.Collections.Generic;
using System.Linq;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Signers;

namespace API_FitTrack.Repositories
{
    public class ExercicioRepository : IExercicioRepository
    {
        private readonly FitTrackContext _context;

        public ExercicioRepository(FitTrackContext context)
        {
            _context = context;
        }


        public void Cadastrar(Exercicio exercicio)
        {
            _context.Exercicio.Add(exercicio);
            _context.SaveChanges();
        }

        public Exercicio BuscarPorId(Guid id)
        {
            return _context.Exercicio.FirstOrDefault(e => e.IdExercicio == id)!;
        }

        public void Atualizar(Exercicio exercicio)
        {
            _context.Exercicio.Update(exercicio);
            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            var exercicio = _context.Exercicio.Find(id);
            if (exercicio != null)
            {
                _context.Exercicio.Remove(exercicio);
                _context.SaveChanges();
            }
        }

        public List<Exercicio> ListarTodos()
        {
            return _context.Exercicio.Include(x => x.GrupoMuscular).Include(x => x.MidiaExercicio).ToList();
        }

        public Exercicio BuscarExercicioPorIdGrupoMuscular(Guid idGrupoMuscular) {
            return _context.Exercicio.Include(x => x.MidiaExercicio).FirstOrDefault(x => x.IdGrupoMuscular == idGrupoMuscular);
        }
    }
}
