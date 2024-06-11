using API_FitTrack.Interfaces;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace FitTrack_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefeicaoController : ControllerBase
    {
        private readonly IRefeicaoRepository _refeicaoRepository;

        public RefeicaoController(IRefeicaoRepository refeicaoRepository)
        {
            _refeicaoRepository = refeicaoRepository;
        }

        [HttpGet("BuscarRefeicaoPorId")]

        public IActionResult BuscarRefeicaoPorId(Guid id)
        {
            try
            {
                return StatusCode(200, _refeicaoRepository.BuscarRefeicaoPorId(id));
            }
            catch (Exception E)
            {

                return BadRequest(E.Message);
            }
        }

        [HttpPut("AtualizarRefeicao")]
        public IActionResult AtualizarRefeicao(Guid idRefeicao, RefeicaoViewModel refeicaoViewModel)
        {
            try
            {
                _refeicaoRepository.AtualizarRefeicao(idRefeicao, refeicaoViewModel);
                return StatusCode(200);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete("ExcluirRefeicao")]
        public IActionResult ExcluirRefeicao(Guid idRefeicao)
        {

            try
            {
                _refeicaoRepository.ExcluirRefeicao(idRefeicao);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


        [HttpPost("CadastrarRefeicao")]
        public IActionResult CadastrarRefeicao(RefeicaoViewModel RefeicaoViewModel)
        {

            try
            {
                _refeicaoRepository.CadastrarRefeicao(RefeicaoViewModel);
                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpGet("ListarRefeicoesDoUsuario")]
        public IActionResult ListarRefeicoesDoUsuario()
        {

            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return StatusCode(200, _refeicaoRepository.ListarRefeicoesDoUsuario(idUsuario));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
