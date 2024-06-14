using FitTrack_API.ViewModels.AlimentosViewModel;

namespace FitTrack_API.ViewModels
{
    public class CadastrarRefeicaoViewModel
    {
        public string? NomeRefeicao { get; set; }
        public Guid IdUsuario { get; set; }
        public List<CadastrarAlimentoViewModel> Alimentos { get; set; } = [];
    }
}
