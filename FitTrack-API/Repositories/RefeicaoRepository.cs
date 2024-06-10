using API_FitTrack.Domains;
using FitTrack_API.Contexts;
using FitTrack_API.Interfaces;
using FitTrack_API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace FitTrack_API.Repositories
{
    public class RefeicaoRepository : IRefeicaoRepository
    {
        private readonly FitTrackContext ctx;

        public RefeicaoRepository(FitTrackContext context)
        {
            ctx = context;
        }


        public void AtualizarRefeicao(Guid idRefeicao, RefeicaoViewModel RefeicaoViewModel)
        {
            Refeicao refeicaoBuscada = BuscarRefeicaoPorId(idRefeicao);

            refeicaoBuscada.NomeRefeicao = RefeicaoViewModel.NomeRefeicao;

            ctx.Refeicao.Update(refeicaoBuscada);
            ctx.SaveChanges();
        }

        public Refeicao BuscarRefeicaoPorId(Guid id)
        {
            return ctx.Refeicao.FirstOrDefault(x => x.IdRefeicao == id)! ?? throw new Exception("Nenhuma refeição encontrada!");
        }

        public void CadastrarRefeicao(RefeicaoViewModel RefeicaoViewModel)
        {
            Refeicao refeicao = new()
            {
                NomeRefeicao = RefeicaoViewModel.NomeRefeicao,
                IdUsuario = RefeicaoViewModel.IdUsuario

            };
            ctx.Refeicao.Add(refeicao);
            ctx.SaveChanges();
        }

        public void ExcluirRefeicao(Guid idRefeicao)
        {
            ctx.Refeicao.Remove(BuscarRefeicaoPorId(idRefeicao));
        }

        public List<Refeicao> ListarRefeicoesDoUsuario(Guid idUsuario)
        {
            List<Refeicao> refeicoesUsuario = ctx.Refeicao
                 //.Include(x => x.Usuario)


                 .Where(x => x.IdUsuario == idUsuario).ToList();

            if (refeicoesUsuario.Count == 0)
            {
                throw new Exception("Nenhuma dieta encontrada!");
            }
            return refeicoesUsuario;
        }
    }
}
