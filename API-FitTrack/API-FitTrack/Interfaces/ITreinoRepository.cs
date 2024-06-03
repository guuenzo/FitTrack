using API_FitTrack.Domains;

namespace API_FitTrack.Interfaces
{
    public interface ITreinoRepository
    {
        void Cadastrar(Treino treino);

        public List<Treino> ListarTreinosUsuarioId(Guid idUsuario);

        public void AtualizarTreino(Guid id, Treino treino);

        vo
    }
}
