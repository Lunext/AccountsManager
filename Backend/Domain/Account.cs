using BusinessLogic.Validations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Account
    {
        
        public int Id { get; set; }
        [Required(ErrorMessage ="Debe introducir el nombre")]
        [StringLength(60, MinimumLength =4, ErrorMessage ="El nombre debe tener entre 4 y 60 caracteres")]
        public string AccountOwner { get; set; } = null!;

        [Required(ErrorMessage ="Debe seleccionar un tipo de cuenta")]
        [RegularExpression("^(Ahorro|Corriente)$",ErrorMessage="El tipo de cuenta debe ser Ahorro o Corriente")]
        public AccountType? AccountType { get; set; }

        [Required(ErrorMessage ="Debe introducir un numero de cuenta")]
        [RegularExpression("^[0-9]+$", ErrorMessage="Solo se permiten numeros")]
        public string AccountNumber { get; set; } = null!;
        [Required]
        [CustomValidation(typeof(Validations), "ValidateDominicanId")]
        public string DominicanId { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;

      
        [Range(0.01, double.MaxValue, ErrorMessage ="El campo debe ser mayor que 0")]
        public decimal Balance { get; set; }

    }
}
