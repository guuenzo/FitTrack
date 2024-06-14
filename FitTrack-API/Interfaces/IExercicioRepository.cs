using System;
using System.Collections.Generic;
using API_FitTrack.Domains;
using FitTrack_API.ViewModels.ExerciciosViewModel;

namespace API_FitTrack.Interfaces
{
    public interface IExercicioRepository
    {
        void Cadastrar(ExibirExercicioViewModel exercicio);
        ExibirExercicioViewModel BuscarPorId(Guid id);
        void Atualizar(ExibirExercicioViewModel exercicio);
        void Deletar(Guid id);
        List<Exercicio> ListarTodos();
        List<Exercicio> BuscarExercicioPorIdGrupoMuscular(List<Guid> idGruposMusculares);
    }
}
