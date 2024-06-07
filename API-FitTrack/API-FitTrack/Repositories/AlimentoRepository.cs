using API_FitTrack.Contexts;
using API_FitTrack.Domains;
using API_FitTrack.Interfaces;

namespace API_FitTrack.Repositories
{
    public class AlimentoRepository : IAlimentoRepository
    {
        FitTrackBdContext ctx = new FitTrackBdContext();

        public void Atualizar(Guid id, Alimento alimento)
        {
            try
            {
                Alimento alimentoBuscado = ctx.Alimentos.FirstOrDefault(x => x.IdAlimento == id);

                if (alimentoBuscado != null)
                {
                    alimentoBuscado.NomeAlimento = alimento.NomeAlimento;
                    alimentoBuscado.Calorias = alimento.Calorias;
                    alimentoBuscado.Proteinas = alimento.Proteinas;
                    alimentoBuscado.Carboidratos = alimento.Carboidratos;
                    alimentoBuscado.Gorduras = alimento.Gorduras;
                }
                ctx.Update(alimentoBuscado);
                ctx.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }

        }

        public Alimento BuscarPorId(Guid id)
        {
            try
            {
                return ctx.Alimentos.FirstOrDefault(x => x.IdAlimento == id)!;
            }
            catch (Exception)
            {

                throw;
            }
            ;
        }

        public void Cadastrar(Alimento alimento)
        {
            try
            {
                ctx.Add(alimento);
                ctx.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Alimento alimentoBuscado = ctx.Alimentos.FirstOrDefault(x => x.IdAlimento == id);
                ctx.Remove(alimentoBuscado);
                ctx.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Alimento> Listar()
        {
            try
            {
                return ctx.Alimentos.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
