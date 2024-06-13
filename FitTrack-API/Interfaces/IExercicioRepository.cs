using System;
using System.Collections.Generic;
using API_FitTrack.Domains;
using FitTrack_API.ViewModels;

namespace API_FitTrack.Interfaces
{
    public interface IExercicioRepository
    {
        void Cadastrar(ExercicioViewModel exercicio);
        ExercicioViewModel BuscarPorId(Guid id);
        public List<Exercicio> BuscarExercicioPorIdGrupoMuscular(List<Guid> idGrupoMuscular);
        void Atualizar(ExercicioViewModel exercicio);
        void Deletar(Guid id);
        List<Exercicio> ListarTodos();
    }
}
