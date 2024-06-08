using API_FitTrack.Contexts;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using API_FitTrack.Utils;
using API_FitTrack.ViewModels;
using WebAPI.Utils.BlobStorage;

namespace API_FitTrack.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        FitTrackBdContext ctx = new FitTrackBdContext();

        public bool AlterarSenha(string email, string senhaNova)
        {
            try
            {
                var usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Email == email);

                if (usuarioBuscado == null) return false;

                usuarioBuscado.Senha = Criptografia.GerarHash(senhaNova);

                ctx.Update(usuarioBuscado);

                ctx.SaveChanges();

                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task AtualizarFoto(Guid id, Usuario user)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == id)! ?? throw new Exception("Usuário não encontrado!");

                if (usuarioBuscado.BlobNameFoto != null)
                {
                    await AzureBlobStorageHelper.DeleteBlobAsync(usuarioBuscado.BlobNameFoto);
                }

                usuarioBuscado.Foto = user.Foto;
                usuarioBuscado.BlobNameFoto = user.BlobNameFoto;

                ctx.Usuarios.Update(usuarioBuscado!);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                return ctx.Usuarios.Select(u => new Usuario
                {

                    IdUsuario = u.IdUsuario,
                    Email = u.Email,
                    Nome = u.Nome,
                    Foto = u.Foto,
                    Peso = u.Peso,
                    Altura = u.Altura,
                    Status = u.Status,


                }).FirstOrDefault(x => x.IdUsuario == id)! ?? throw new Exception("Usuário não encontrado!");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario usuario)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Email == usuario.Email)!;
                bool emailEValido = EmailValidator.IsValidEmail(usuario.Email);

                if (usuarioBuscado != null)
                {
                    throw new Exception("Já existe um usuário com esse email.");
                }

                if (!emailEValido)
                {
                    throw new Exception("O E-mail está em um formato inválido!");
                }



                usuario.Senha = Criptografia.GerarHash(usuario.Senha!);
                usuario.Foto = "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/default_image.png";
                ctx.Add(usuario);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                //retorna null se nao achar o usuario
                var user = ctx.Usuarios.Select(u => new Usuario
                {
                    IdUsuario = u.IdUsuario,
                    Email = u.Email,
                    Senha = u.Senha,
                    Nome = u.Nome,
                }).FirstOrDefault
                (x => x.Email == email) ?? throw new Exception("Usuário não encontrado!");


                if (!Criptografia.CompararHash(senha, user.Senha!)) throw new Exception("Usuário não encontrado!");

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public Usuario AtualizarDadosPerfil(Guid id, AlterarDadosPerfilViewModel usuario)
        //{
        //    try
        //    {
        //        Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == id) ?? throw new Exception("Usuário não encontrado!");


        //        //se o peso n for informado retorna oq já estava no banco
        //        if (!usuario.Peso.HasValue || usuario.Peso == 0m)
        //        {
        //            usuarioBuscado.Peso = usuarioBuscado.Peso;
        //        }
        //        else
        //        {
        //            usuarioBuscado.Peso = usuario.Peso;
        //        }

        //        if (usuario.Status == null)
        //        {
        //            usuarioBuscado.Status = usuarioBuscado.Status;
        //        }
        //        else
        //        {
        //            usuarioBuscado.Status = usuario.Status;
        //        }

        //        if (!usuario.Altura.HasValue || usuario.Altura == 0m)
        //        {
        //            usuarioBuscado.Altura = usuarioBuscado.Altura;
        //        }
        //        else
        //        {
        //            usuarioBuscado.Altura = usuario.Altura;

        //        }






        //        ctx.Usuarios.Update(usuarioBuscado);
        //        ctx.SaveChanges();




        //        return usuarioBuscado;



        //    }
        //    catch (Exception) { throw; }
        //}
        public Usuario AtualizarDadosPerfil(Guid id, AlterarDadosPerfilViewModel usuario)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == id) ?? throw new Exception("Usuário não encontrado!");

                // Atualizar Peso
                if (usuario.Peso.HasValue && usuario.Peso != 0m)
                {
                    usuarioBuscado.Peso = usuario.Peso;
                }

                // Atualizar Status
                usuarioBuscado.Status = usuario.Status ?? usuarioBuscado.Status;

                // Atualizar Altura
                if (usuario.Altura.HasValue && usuario.Altura != 0m)
                {
                    usuarioBuscado.Altura = usuario.Altura;
                }

                // Persistir mudanças no banco de dados
                ctx.Usuarios.Update(usuarioBuscado);
                ctx.SaveChanges();

                return usuarioBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
