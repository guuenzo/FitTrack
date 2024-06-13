using FitTrack_API.Contexts;
using FitTrack_API.Domains;
using FitTrack_API.Interfaces;

namespace FitTrack_API.Repositories
{
    public class GrupoMuscularRepository : IGrupoMuscularRepository
    {
        private readonly FitTrackContext _context;

        public GrupoMuscularRepository(FitTrackContext context)
        {
            _context = context;
        }

        public List<GrupoMuscular> ListarTodos()
        {
            return _context.GrupoMuscular.ToList();
        }
    }
}
