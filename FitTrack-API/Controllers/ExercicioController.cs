using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.Domains;

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

        [HttpGet]
        public ActionResult<List<Exercicio>> Get()
        {
            return _exercicioRepository.ListarTodos();
        }

        [HttpGet("{id}")]
        public ActionResult<Exercicio> Get(Guid id)
        {
            return _exercicioRepository.BuscarPorId(id);
        }

        [HttpPost]
        public ActionResult Post(Exercicio exercicio)
        {
            _exercicioRepository.Cadastrar(exercicio);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public ActionResult Put(Guid id, Exercicio exercicio)
        {
            exercicio.IdExercicio = id;
            _exercicioRepository.Atualizar(exercicio);
            return StatusCode(204);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            _exercicioRepository.Deletar(id);
            return StatusCode(204);
        }
    }
}
