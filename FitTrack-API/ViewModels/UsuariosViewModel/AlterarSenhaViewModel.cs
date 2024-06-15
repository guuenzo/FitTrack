using System.ComponentModel.DataAnnotations;

namespace FitTrack_API.ViewModels.UsuariosViewModel
{
    public class AlterarSenhaViewModel
    {

        [Required(ErrorMessage = "Informe a nova senha do usuário")]
        public string? SenhaNova { get; set; }
    }
}