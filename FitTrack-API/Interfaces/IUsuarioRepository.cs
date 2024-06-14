using API_FitTrack.Domains;
using API_FitTrack.ViewModels;

namespace API_FitTrack.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario);

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmailESenha(string email, string senha);

        bool AlterarSenha(string email, string senhaNova);

        Task AtualizarFoto(Guid id, Usuario user);

        Usuario AtualizarDadosPerfil(Guid id, AlterarDadosPerfilViewModel usuario);
    }
}
