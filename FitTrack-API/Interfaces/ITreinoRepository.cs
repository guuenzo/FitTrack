using System;
using System.Collections.Generic;
using API_FitTrack.Domains;
using FitTrack_API.ViewModels;

namespace API_FitTrack.Interfaces
{
    public interface ITreinoRepository
    {
        void Cadastrar(TreinoViewModel treino);
        Treino BuscarPorId(Guid id);
        void Atualizar(Treino treino);
        void Deletar(Guid id);
        List<Treino> ListarTodos();
    }
}
