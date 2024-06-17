using System;
using System.Collections.Generic;
using API_FitTrack.Domains;
using FitTrack_API.ViewModels.ExerciciosViewModel;
using FitTrack_API.ViewModels.TreinosViewModel;

namespace API_FitTrack.Interfaces
{
    public interface ITreinoRepository
    {
        void Cadastrar(CadastrarTreinoViewModel treino);
        ExibirTreinoViewModel BuscarPorId(Guid id);
        void Atualizar(Guid idTreino, AtualizarTreinoViewModel atualizarTreinoViewModel);
        void Deletar(Guid id);
        List<ExibirTreinoViewModel> ListarTodosOsTreinosDoUsuario(Guid idUsuario);
    }
}
