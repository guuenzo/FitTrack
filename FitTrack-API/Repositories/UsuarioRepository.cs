using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using API_FitTrack.Utils;
using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.ViewModels.UsuariosViewModel;
using Microsoft.EntityFrameworkCore;
using WebAPI.Utils.BlobStorage;

namespace API_FitTrack.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly FitTrackContext ctx;

        public UsuarioRepository(FitTrackContext context)
        {
            ctx = context;
        }

        public bool AlterarSenha(string email, string senhaNova)
        {
            try
            {
                var usuarioBuscado = ctx.Usuario.FirstOrDefault(x => x.Email == email);

                if (usuarioBuscado == null) return false;

                usuarioBuscado.Senha = Criptografia.GerarHash(senhaNova);

                ctx.Usuario.Update(usuarioBuscado);

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
                Usuario usuarioBuscado = ctx.Usuario.Include(x => x.UsuarioMidia).FirstOrDefault(x => x.IdUsuario == id)! ?? throw new Exception("Usuário não encontrado!");

                if (usuarioBuscado.UsuarioMidia!.BlobNameFotoUsuario != null)
                {
                    await AzureBlobStorageHelper.DeleteBlobAsync(usuarioBuscado.UsuarioMidia!.BlobNameFotoUsuario);
                }

                usuarioBuscado.UsuarioMidia!.FotoUsuario = user.UsuarioMidia!.FotoUsuario;
                usuarioBuscado.UsuarioMidia!.BlobNameFotoUsuario = user.UsuarioMidia!.BlobNameFotoUsuario;

                ctx.Usuario.Update(usuarioBuscado!);
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
                return ctx.Usuario.Include(x => x.UsuarioMidia).Include(x => x.UsuarioObjetivo).Select(u => new Usuario
                {

                    IdUsuario = u.IdUsuario,
                    Email = u.Email,
                    Nome = u.Nome,
                    Peso = u.Peso,
                    Altura = u.Altura,
                    CodigoRecuperacaoSenha = u.CodigoRecuperacaoSenha,

                    UsuarioObjetivo = u.UsuarioObjetivo != null ? new UsuarioObjetivo
                    {
                        IdUsuarioObjetivo = u.UsuarioObjetivo!.IdUsuarioObjetivo,
                        Objetivo = u.UsuarioObjetivo.Objetivo
                    } : null,

                    UsuarioMidia = new UsuarioMidia
                    {
                        IdUsuarioMidia = u.UsuarioMidia!.IdUsuarioMidia,
                        FotoUsuario = u.UsuarioMidia.FotoUsuario,
                        BlobNameFotoUsuario = u.UsuarioMidia.BlobNameFotoUsuario

                    }

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
                Usuario usuarioBuscado = ctx.Usuario.FirstOrDefault(x => x.Email == usuario.Email)!;
                bool emailEValido = EmailValidator.IsValidEmail(usuario.Email!);

                if (usuarioBuscado != null)
                {
                    throw new Exception("Já existe um usuário com esse email.");
                }

                if (!emailEValido)
                {
                    throw new Exception("O E-mail está em um formato inválido!");
                }



                UsuarioMidia usuarioMidia = new()
                {
                    IdUsuarioMidia = usuario.IdUsuario,
                    FotoUsuario = "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/default_image.png"
                };


                usuario.UsuarioMidia = usuarioMidia;

                usuario.Senha = Criptografia.GerarHash(usuario.Senha!);
                ctx.Usuario.Add(usuario);
                ctx.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                //retorna null se nao achar o usuario
                var user = ctx.Usuario.Include(x => x.UsuarioMidia).Select(u => new Usuario
                {
                    IdUsuario = u.IdUsuario,
                    Email = u.Email,
                    Senha = u.Senha,
                    Nome = u.Nome,

                    UsuarioMidia = new UsuarioMidia
                    {
                        IdUsuarioMidia = u.UsuarioMidia!.IdUsuarioMidia,
                        FotoUsuario = u.UsuarioMidia!.FotoUsuario
                    }
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


        public void AtualizarDadosPerfil(Guid id, AlterarDadosPerfilViewModel usuario)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuario.Include(x => x.UsuarioObjetivo).FirstOrDefault(x => x.IdUsuario == id) ?? throw new Exception("Usuário não encontrado!");

                // Atualizar Peso
                if (usuario.Peso.HasValue && usuario.Peso != 0m)
                {
                    usuarioBuscado.Peso = usuario.Peso;
                }

                // Atualizar Status
                usuarioBuscado.IdUsuarioObjetivo = usuario.IdUsuarioObjetivo ?? usuarioBuscado.IdUsuarioObjetivo;

                // Atualizar Altura
                if (usuario.Altura.HasValue && usuario.Altura != 0m)
                {
                    usuarioBuscado.Altura = usuario.Altura;
                }

                // Persistir mudanças no banco de dados
                ctx.Usuario.Update(usuarioBuscado);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
