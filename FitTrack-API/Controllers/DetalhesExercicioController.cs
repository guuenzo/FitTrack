using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using API_FitTrack.Repositories;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels.DetalhesExercicioViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalhesExercicioController : ControllerBase
    {
        private readonly IDetalhesExercicioRepository _detalhesExercicioRepository;

        public DetalhesExercicioController(IDetalhesExercicioRepository detalhesExercicioRepository)
        {
            _detalhesExercicioRepository = detalhesExercicioRepository;
        }


        [HttpPut("Atualizar")]
        public IActionResult Atualizar(DetalhesExercicioViewModel detalhesExercicioViewModel)
        {
            try
            {
                _detalhesExercicioRepository.Atualizar(detalhesExercicioViewModel);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("ListarDetalhesDeUmExercicio")]
        public IActionResult Listar(Guid idUsuario, Guid idExercicio)
        {
            try
            {
                return StatusCode(200, _detalhesExercicioRepository.ListarDetalhesDeUmExercicio(idUsuario, idExercicio));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
