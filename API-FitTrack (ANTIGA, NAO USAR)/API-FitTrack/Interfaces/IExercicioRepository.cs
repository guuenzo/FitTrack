using System;
using System.Collections.Generic;
using API_FitTrack.Domains;

namespace API_FitTrack.Interfaces
{
    public interface IExercicioRepository
    {
        void Cadastrar(Exercicio exercicio);
        Exercicio BuscarPorId(Guid id);
        void Atualizar(Exercicio exercicio);
        void Deletar(Guid id);
        List<Exercicio> ListarTodos();
    }
}
