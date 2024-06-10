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
        private readonly IUsuarioRepository _usuarioRepository;

        private readonly EmailSendingService _emailSendingService;

        public UsuarioController(EmailSendingService emailSendingService, IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
            _emailSendingService = emailSendingService;
        }

        [HttpPost("CadastrarUsuario")]
        public async Task<IActionResult> Post(CadastrarUsuarioViewModel novoUsuario)
        {
            try
            {
                Usuario usuario = new()
                {
                    Nome = novoUsuario.Nome,
                    Email = novoUsuario.Email,
                    Senha = novoUsuario.Senha
                };

                _usuarioRepository.Cadastrar(usuario);
                await _emailSendingService.SendWelcomeEmail(usuario.Email!, usuario.Nome!);

                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return (BadRequest(ex.Message));
            }
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
                _usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

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
                return Ok(_usuarioRepository.BuscarPorId(id));
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
                Usuario userPreenchido = new();
                userPreenchido.UsuarioMidia = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!);

                await _usuarioRepository.AtualizarFoto(id, userPreenchido);

                return StatusCode(200);
            }
            catch (Exception ex)
            {

                return (BadRequest(ex.Message));
            }
        }
        [HttpPatch("AlterarDadosPerfil")]
        public IActionResult AlterarDadosPerfil(Guid idUsuario, AlterarDadosPerfilViewModel usuario)
        {
            try
            {
                return Ok(_usuarioRepository.AtualizarDadosPerfil(idUsuario, usuario));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}