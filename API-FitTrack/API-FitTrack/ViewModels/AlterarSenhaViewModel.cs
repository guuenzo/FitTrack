using System.ComponentModel.DataAnnotations;

namespace API_FitTrack.ViewModels
{
    public class AlterarSenhaViewModel
    {

        [Required(ErrorMessage = "Informe a nova senha do usuário")]
        public string? SenhaNova { get; set; }
    }
}
