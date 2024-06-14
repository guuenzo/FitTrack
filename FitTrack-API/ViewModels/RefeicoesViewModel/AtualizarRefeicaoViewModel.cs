using FitTrack_API.ViewModels.AlimentosViewModel;

namespace FitTrack_API.ViewModels
{
    public class AtualizarRefeicaoViewModel
    {
        public string? NomeRefeicao { get; set; }
        public List<CadastrarAlimentoViewModel> Alimentos { get; set; } = [];
    }
}
