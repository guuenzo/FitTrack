using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.ViewModels;

namespace API_FitTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercicioController : ControllerBase
    {
        private readonly IExercicioRepository _exercicioRepository;

        public ExercicioController(IExercicioRepository exercicioRepository)
        {
            _exercicioRepository = exercicioRepository;
        }


        [HttpPost("CadastrarExercicio")]
        public IActionResult CadastrarExercicio(ExercicioViewModel exercicio)
        {
            try
            {
                _exercicioRepository.Cadastrar(exercicio);
                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [HttpDelete("ExcluirExercicio")]

        public IActionResult ExcluirExercicio(Guid id)
        {

            try
            {
                _exercicioRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("ListarTodos")]

        public IActionResult ListarTodos()
        {

            try
            {

                return StatusCode(200, _exercicioRepository.ListarTodos());
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpGet("ListarPorGrupoMuscular")]

        public IActionResult ListarPorGrupoMuscular(Guid id)
        {

            try
            {

                return StatusCode(200, _exercicioRepository.BuscarExercicioPorIdGrupoMuscular(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
