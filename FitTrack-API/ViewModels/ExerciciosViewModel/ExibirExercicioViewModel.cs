using FitTrack_API.Domains;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace FitTrack_API.ViewModels.ExerciciosViewModel
{
    public class ExibirExercicioViewModel
    {
        public Guid IdExercicio { get; set; }
        public string? NomeExercicio { get; set; }
        public string? Descricao { get; set; }

        public GrupoMuscular? GrupoMuscular { get; set; }

        public MidiaExercicio? MidiaExercicio { get; set; }
    }
}