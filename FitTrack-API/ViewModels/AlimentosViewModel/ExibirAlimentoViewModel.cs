namespace FitTrack_API.ViewModels.AlimentosViewModel
{
    public class ExibirAlimentoViewModel
    {
        public Guid IdAlimento { get; set; }
        public string? NomeAlimento { get; set; }
        public decimal? Peso { get; set; }
        public decimal? Proteinas { get; set; }
        public decimal? Calorias { get; set; }
        public decimal? Carboidratos { get; set; }
        public decimal? Gorduras { get; set; }
    }
}
