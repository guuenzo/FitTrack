using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using API_FitTrack.Repositories;
using API_FitTrack.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_FitTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlimentoController : ControllerBase
    {
        private IAlimentoRepository alimentoRepository { get; set; }

        public AlimentoController()
        {
            alimentoRepository = new AlimentoRepository();
        }

        [HttpPost("CadastrarAlimento")]
        public IActionResult CadastrarAlimento(AlimentoViewModel novoAlimento) {
            try
            {
                Alimento alimento = new Alimento();

                alimento.NomeAlimento = novoAlimento.NomeAlimento;
                alimento.Calorias = novoAlimento.Calorias;
                alimento.Proteinas = novoAlimento.Proteinas;
                alimento.Carboidratos = novoAlimento.Carboidratos;
                alimento.Gorduras = novoAlimento.Gorduras;

                alimentoRepository.Cadastrar(alimento);
                return Ok();
            }
            catch (Exception ex)
            {

                return(BadRequest(ex.InnerException.Message));
            }
        }
    }
}
