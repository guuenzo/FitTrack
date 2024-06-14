using FitTrack_API.ViewModels.AlimentosViewModel;

namespace FitTrack_API.ViewModels.RefeicoesViewModel
{
    public class ExibirRefeicaoViewModel
    {
        public Guid IdRefeicao { get; set; }
        public string? NomeRefeicao { get; set; }
        public Guid IdUsuario { get; set; }
        public List<ExibirAlimentoViewModel> Alimentos { get; set; } = [];
    }
}
