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
    public class TreinoController : ControllerBase
    {
        private readonly ITreinoRepository _treinoRepository;

        public TreinoController(ITreinoRepository treinoRepository)
        {
            _treinoRepository = treinoRepository;
        }

        [HttpPost("CadastrarTreino")]
        public IActionResult CadastrarTreino(TreinoViewModel treino)
        {
            try
            {
                _treinoRepository.Cadastrar(treino);
                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete("ExcluirTreino")]
        public IActionResult ExcluirTreino(Guid id)
        {

            try
            {
                _treinoRepository.Deletar(id);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPut("AtulizarTreino")]
        public IActionResult AtulizarTreino(Guid idTreino, List<ExercicioViewModel> exerciciosViewModel)
        {

            try
            {
                _treinoRepository.Atualizar(idTreino, exerciciosViewModel);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
