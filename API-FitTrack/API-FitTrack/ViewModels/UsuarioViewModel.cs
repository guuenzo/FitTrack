using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.ViewModels
{
    public class UsuarioViewModel
    {
        [JsonIgnore]
        [NotMapped]
        public IFormFile? Arquivo { get; set; }

        public string? Foto { get; set; }
    }
}