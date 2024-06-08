using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;

namespace API_FitTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreinoController : ControllerBase
    {
        private readonly ITreinoRepository _treinoRepository;

        public TreinoController(ITreinoRepository treinoRepository)
        {
            _treinoRepository = treinoRepository;
        }

        [HttpGet]
        public ActionResult<List<Treino>> Get()
        {
            return _treinoRepository.ListarTodos();
        }

        [HttpGet("{id}")]
        public ActionResult<Treino> Get(Guid id)
        {
            return _treinoRepository.BuscarPorId(id);
        }

        [HttpPost]
        public ActionResult Post(Treino treino)
        {
            _treinoRepository.Cadastrar(treino);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public ActionResult Put(Guid id, Treino treino)
        {
            treino.IdTreino = id;
            _treinoRepository.Atualizar(treino);
            return StatusCode(204);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            _treinoRepository.Deletar(id);
            return StatusCode(204);
        }
    }
}
