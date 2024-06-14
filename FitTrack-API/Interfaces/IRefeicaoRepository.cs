using API_FitTrack.Domains;
using FitTrack_API.Domains;
using FitTrack_API.ViewModels;
using FitTrack_API.ViewModels.RefeicoesViewModel;

namespace FitTrack_API.Interfaces
{
    public interface IRefeicaoRepository
    {
        void AtualizarRefeicao(Guid idRefeicao, AtualizarRefeicaoViewModel atualizarRefeicaoViewModel);

        ExibirRefeicaoViewModel BuscarRefeicaoPorId(Guid id);

        void CadastrarRefeicao(CadastrarRefeicaoViewModel CadastrarRefeicaoViewModel);

        void ExcluirRefeicao(Guid idRefeicao);

        List<ExibirRefeicaoViewModel> ListarRefeicoesDoUsuario(Guid idUsuario);
    }
}
