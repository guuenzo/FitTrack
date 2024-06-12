﻿using Org.BouncyCastle.Bcpg.OpenPgp;

namespace FitTrack_API.ViewModels
{
    public class ExercicioViewModel
    {
        public Guid idExercicio { get; set; }
        public string NomeExercicio { get; set; }
        public string Descricao { get; set; }
        public int Repeticoes { get; set; }
        public int Series { get; set; }
        public decimal Carga { get; set;  }
    }
}
