using API_FitTrack.Interfaces;
using API_FitTrack.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_FitTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository {  get; set; }

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, string senhaNova)
        {
            try
            {
                usuarioRepository.AlterarSenha(email, senhaNova);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id) {
            try
            {
                return (Ok(usuarioRepository.BuscarPorId(id)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPut("AlterarFoto")]
        //public void AtualizarFoto(Guid id, string novaUrlFoto)
        //{
        //    try
        //    {
        //        usuarioRepository.AtualizarFoto(id, novaUrlFoto);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}
    }
}
