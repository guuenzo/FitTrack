using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using API_FitTrack.Repositories;
using API_FitTrack.Utils.Mail;
using API_FitTrack.ViewModels;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils.BlobStorage;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        private readonly EmailSendingService _emailSendingService;

        public UsuarioController(EmailSendingService emailSendingService)
        {
            usuarioRepository = new UsuarioRepository();
            _emailSendingService = emailSendingService;
        }

        [HttpPost("CadastrarUsuario")]
        public async Task<IActionResult> Post(CadastrarUsuarioViewModel novoUsuario) {
            try
            {
                Usuario usuario = new Usuario();

                usuario.Nome = novoUsuario.Nome;
                usuario.Email = novoUsuario.Email;
                usuario.Senha = novoUsuario.Senha;

                usuarioRepository.Cadastrar(usuario);
                await _emailSendingService.SendWelcomeEmail(usuario.Email, usuario.Nome);

                return Ok();
            }
            catch (Exception ex)
            {

                return(BadRequest(ex.InnerException.Message));
            }
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
                usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("AlterarFotoPerfil")]
        public async Task<IActionResult> UploadProfileImage(Guid id, [FromForm] UsuarioViewModel user)
        {
            try
            {
                Usuario usuarioBuscado = usuarioRepository.BuscarPorId(id);

                if (usuarioBuscado == null) { return NotFound(); }

                //logica para o upload de imagem 
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubg16enzo;AccountKey=oE4zwTcqqxKfuErbVv7o9ETdAbHzELSZDt7o60W5hQ07zfFdTU4YuZIGtOyVKRjh3E3GzJwRnAHn+AStsOUjgA==;EndpointSuffix=core.windows.net";

                var containerName = "containerfittrack";

                string fotoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!, connectionString, containerName);
                //fim do upload de imagem

                usuarioBuscado.Foto = fotoUrl;

                usuarioRepository.AtualizarFoto(id, fotoUrl);

                return Ok();
            }
            catch (Exception ex)
            {

                return (BadRequest(ex.Message));
            }
        }
        [HttpPatch("AlterarDadosPerfil")]
        public IActionResult AlterarDadosPerfil(Guid idUsuario, AlterarDadosPerfilViewModel usuario) {
            try
            {
                return Ok(usuarioRepository.AtualizarDadosPerfil(idUsuario, usuario));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}