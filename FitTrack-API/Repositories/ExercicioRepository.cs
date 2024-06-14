using System;
using System.Collections.Generic;
using System.Linq;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.ViewModels.ExerciciosViewModel;
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


        public void Cadastrar(ExibirExercicioViewModel exercicioViewModel)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Exercicio exercicio = new()
                    {
                        NomeExercicio = exercicioViewModel.NomeExercicio,
                        Descricao = exercicioViewModel.Descricao,
                        IdGrupoMuscular = exercicioViewModel.GrupoMuscular.IdGrupoMuscular,
                    };

                    exercicio.IdMidiaExercicio = exercicio.IdExercicio;

                    MidiaExercicio midiaExercicio = new()
                    {
                        IdMidiaExercicio = exercicio.IdExercicio,
                        VideoExercicio = exercicioViewModel.MidiaExercicio.VideoExercicio,
                        BlobNameVideoExercicio = exercicioViewModel.MidiaExercicio.BlobNameVideoExercicio,
                    };


                    _context.Exercicio.Add(exercicio);
                    _context.MidiaExercicio.Add(midiaExercicio);
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

        public ExibirExercicioViewModel BuscarPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Atualizar(ExibirExercicioViewModel exercicio)
        {
            throw new NotImplementedException();
        }

        public void Deletar(Guid id)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    Exercicio exercicioBuscado = _context.Exercicio.FirstOrDefault(x => x.IdExercicio == id)! ?? throw new Exception("Exercício não encontrado!");

                    MidiaExercicio midiaExercicio = _context.MidiaExercicio.FirstOrDefault(x => x.IdMidiaExercicio == exercicioBuscado.IdMidiaExercicio)! ?? throw new Exception("Mídia de Exercício não encontrada!");

                    _context.Exercicio.Remove(exercicioBuscado);
                    _context.MidiaExercicio.Remove(midiaExercicio);
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

        public List<Exercicio> ListarTodos()
        {
            return _context.Exercicio.Include(x => x.GrupoMuscular).Include(x => x.MidiaExercicio).ToList();
        }

        public List<Exercicio> BuscarExercicioPorIdGrupoMuscular(List<Guid> idGruposMusculares)
        {
            return _context.Exercicio
                .Include(x => x.GrupoMuscular)
                .Include(x => x.MidiaExercicio)
                .Where(x => idGruposMusculares.Contains(x.IdGrupoMuscular))
                .ToList();
        }

    }
}
