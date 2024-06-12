using System;
using System.Collections.Generic;
using API_FitTrack.Domains;

namespace API_FitTrack.Interfaces
{
    public interface IExercicioRepository
    {
        void Cadastrar(Exercicio exercicio);
        Exercicio BuscarPorId(Guid id);
        public List<Exercicio> BuscarExercicioPorIdGrupoMuscular(Guid idGrupoMuscular);
        void Atualizar(Exercicio exercicio);
        void Deletar(Guid id);
        List<Exercicio> ListarTodos();
    }
}