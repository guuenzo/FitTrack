using API_FitTrack.Domains;

namespace API_FitTrack.Interfaces
{
    public interface IAlimentoRepository
    {
        void Cadastrar(Refeicao alimento);

        List<Refeicao> Listar();

        Refeicao BuscarPorId(Guid id);

        void Atualizar(Guid id, Refeicao alimento);

        void Deletar(Guid id);
    }
}
