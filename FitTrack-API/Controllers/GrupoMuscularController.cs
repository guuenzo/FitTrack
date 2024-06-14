using FitTrack_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrupoMuscularController : ControllerBase
    {
        private readonly IGrupoMuscularRepository _grupoMuscularRepository;

        public GrupoMuscularController(IGrupoMuscularRepository grupoMuscularRepository)
        {
            _grupoMuscularRepository = grupoMuscularRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_grupoMuscularRepository.ListarTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
    }
}
