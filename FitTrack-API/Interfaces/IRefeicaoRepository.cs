using API_FitTrack.Domains;
using FitTrack_API.Domains;
using FitTrack_API.ViewModels;

namespace FitTrack_API.Interfaces
{
    public interface IRefeicaoRepository
    {
        void AtualizarRefeicao(Guid idRefeicao, RefeicaoViewModel RefeicaoViewModel);

        RefeicaoViewModel BuscarRefeicaoPorId(Guid id);

        void CadastrarRefeicao(RefeicaoViewModel RefeicaoViewModel);

        void ExcluirRefeicao(Guid idRefeicao);

        List<RefeicaoViewModel> ListarRefeicoesDoUsuario(Guid idUsuario);
    }
}
