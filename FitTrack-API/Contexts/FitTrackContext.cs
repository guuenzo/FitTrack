using API_FitTrack.Domains;
using FitTrack_API.Domains;
using Microsoft.EntityFrameworkCore;

namespace FitTrack_API.Contexts
{
    public class FitTrackContext : DbContext
    {
        public FitTrackContext(DbContextOptions<FitTrackContext> options) : base(options) { }


        public DbSet<Alimento> Alimento { get; set; }
        public DbSet<Exercicio> Exercicio { get; set; }
        public DbSet<GrupoMuscular> GrupoMuscular { get; set; }
        public DbSet<MidiaExercicio> MidiaExercicio { get; set; }
        public DbSet<Refeicao> Refeicao { get; set; }
        public DbSet<RefeicaoAlimento> RefeicaoAlimento { get; set; }
        public DbSet<Treino> Treino { get; set; }
        public DbSet<TreinoExercicio> TreinoExercicio { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioMidia> UsuarioMidia { get; set; }
        public DbSet<UsuarioObjetivo> UsuarioObjetivo { get; set; }

        // Você pode remover o método OnConfiguring se não precisar dele
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //     // pc do Senai
            //     // optionsBuilder.UseSqlServer("Server=NOTE14-S14; Database=FitTrackBD; User Id= sa; pwd=Senai@134; TrustServerCertificate=true;");
            //     // base.OnConfiguring(optionsBuilder);

            //     // pc de casa
            optionsBuilder.UseSqlServer("Server=FilipeDesktop\\SQLEXPRESS; Database=FitTrackBD; User Id= sa; pwd=Xtringer28700; TrustServerCertificate=true;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
