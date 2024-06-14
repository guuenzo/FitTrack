using FitTrack_API.ViewModels.ExerciciosViewModel;

namespace FitTrack_API.Utils
{
    public static class GlobalFunctions
    {
        public static bool ExisteItemDuplicado<T>(List<T> lista)
        {
            Dictionary<T, int> dicionario = new();

            foreach (T item in lista)
            {
                if (dicionario.ContainsKey(item))
                {
                    return true; // Encontrado um item duplicado
                }
                else
                {
                    dicionario[item] = 1;
                }
            }

            return false; // Nenhum item duplicado encontrado
        }

        public static void ValidarListaDeExerciciosSeTemDuplicados(List<CadastrarExercicioViewModel> idsExercicios)
        {

            //valida se tem algum exercicio duplicado
            bool temExerciciosDuplicados = ExisteItemDuplicado(idsExercicios);

            if (temExerciciosDuplicados)
            {
                throw new Exception("Há treinos duplicados!");
            }
        }
    }
}
