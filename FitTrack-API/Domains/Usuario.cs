using FitTrack_API.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_FitTrack.Domains
{

    [Table("Usuario")]
    [Index(nameof(Email), IsUnique = true)]
    public partial class Usuario
    {
        [Key]
        public Guid IdUsuario { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O Nome do usuário é obrigatório!")]
        public string? Nome { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O Email do usuário é obrigatório!")]
        public string? Email { get; set; }

        [Column(TypeName = "VARCHAR(60)")]
        [Required(ErrorMessage = "A senha do usuário é obrigatória!")]
        [StringLength(60, MinimumLength = 5, ErrorMessage = "A senha deve conter entre 5 e 30 caracteres.")]
        public string? Senha { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Peso { get; set; }

        [Column(TypeName = "DECIMAL(5,2)")]
        public decimal? Altura { get; set; }

        [Column(TypeName = "INT")]
        public int? CodigoRecuperacaoSenha { get; set; }



        [ForeignKey("IdUsuarioMidia")]
        public UsuarioMidia? UsuarioMidia { get; set; }
        public Guid IdUsuarioMidia { get; set; }

        [ForeignKey("IdUsuarioObjetivo")]
        public UsuarioObjetivo? UsuarioObjetivo { get; set; }
        public Guid? IdUsuarioObjetivo { get; set; }

    }
}