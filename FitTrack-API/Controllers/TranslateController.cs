using FitTrack_API.Utils.Translate;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslateController : ControllerBase
    {
        [HttpPost("TranslatePTToEN")]
        public async Task<IActionResult> TranslatePTToEN(string textToTranslate)
        {
            try
            {
                if (string.IsNullOrEmpty(textToTranslate))
                {
                    return BadRequest("Text to translate cannot be empty.");
                }

                string textoTraduzido = await AzureTranslateService.TrasnslatePTToEN(textToTranslate);

                return StatusCode(200, textoTraduzido);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost("TranslateENToPT")]
        public async Task<IActionResult> TranslateENToPT(string textToTranslate)
        {
            try
            {
                if (string.IsNullOrEmpty(textToTranslate))
                {
                    return BadRequest("Text to translate cannot be empty.");
                }

                string textoTraduzido = await AzureTranslateService.TrasnslateEnToPt(textToTranslate);

                return StatusCode(200, textoTraduzido);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
