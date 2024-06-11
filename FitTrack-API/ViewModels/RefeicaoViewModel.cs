namespace FitTrack_API.ViewModels
{
    public class RefeicaoViewModel
    {
        public Guid IdRefeicao { get; set; }
        public string? NomeRefeicao { get; set; }
        public Guid IdUsuario { get; set; }
        public List<AlimentoViewModel> Alimentos { get; set; } = new List<AlimentoViewModel>();
    }
}
