using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;
using FitTrack_API.ViewModels.ExerciciosViewModel;
using FitTrack_API.ViewModels.TreinosViewModel;

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
        public IActionResult CadastrarTreino(CadastrarTreinoViewModel treino)
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
        public IActionResult AtulizarTreino(Guid idTreino, List<CadastrarExercicioViewModel> cadastrarExercicioViewModel)
        {

            try
            {
                _treinoRepository.Atualizar(idTreino, cadastrarExercicioViewModel);
                return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpGet("ListarTodosOsTreinosDoUsuario")]
        public IActionResult ListarTodosOsTreinosDoUsuario(Guid idUsuario)
        {

            try
            {

                return StatusCode(200, _treinoRepository.ListarTodosOsTreinosDoUsuario(idUsuario));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        [HttpGet("BuscarPorId")]
        public IActionResult BuscarPorId(Guid id)
        {

            try
            {

                return StatusCode(200, _treinoRepository.BuscarPorId(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
