using API_FitTrack.Contexts;
using API_FitTrack.Domains;

namespace API_FitTrack.Interfaces
{
    public interface IAlimentoRepository
    {
        void Cadastrar(Alimento alimento);

        List<Alimento> Listar();

        Alimento BuscarPorId(Guid id);

        void Atualizar(Guid id, Alimento alimento);

        void Deletar(Guid id);
    }
}
