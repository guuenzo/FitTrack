using API_FitTrack.Domains;
using FitTrack_API.ViewModels.UsuariosViewModel;

namespace API_FitTrack.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario);

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmailESenha(string email, string senha);

        bool AlterarSenha(string email, string senhaNova);

        Task AtualizarFoto(Guid id, Usuario user);

        void AtualizarDadosPerfil(Guid id, AlterarDadosPerfilViewModel usuario);
    }
}
