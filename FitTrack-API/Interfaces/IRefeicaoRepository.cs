using API_FitTrack.Domains;
using FitTrack_API.ViewModels;

namespace FitTrack_API.Interfaces
{
    public interface IRefeicaoRepository
    {
        void AtualizarRefeicao(Guid idRefeicao, RefeicaoViewModel RefeicaoViewModel);

        Refeicao BuscarRefeicaoPorId(Guid id);

        void CadastrarRefeicao(RefeicaoViewModel RefeicaoViewModel);

        void ExcluirRefeicao(Guid idRefeicao);

        List<Refeicao> ListarRefeicoesDoUsuario(Guid idUsuario);
    }
}
