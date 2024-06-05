using API_FitTrack.Contexts;
using API_FitTrack.Interfaces;
using API_FitTrack.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao contêiner.
builder.Services.AddControllers();

// Adiciona o contexto do banco de dados
builder.Services.AddDbContext<FitTrackBdContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adiciona o suporte ao Swagger
builder.Services.AddSwaggerGen();

// Registra a interface IExercicioRepository e sua implementação ExercicioRepository
builder.Services.AddScoped<IExercicioRepository, ExercicioRepository>();

// Registra a interface ITreinoRepository e sua implementação TreinoRepository
builder.Services.AddScoped<ITreinoRepository, TreinoRepository>();

var app = builder.Build();

// Configura o pipeline de requisição HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
