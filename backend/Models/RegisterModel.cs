using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public class RegisterModel
    {
        [DataType(DataType.EmailAddress), Required]
        public string Email { get; set; } = "";

        [Required]
        public string UserName { get; set; } = "";

        [DataType(DataType.Password), Required]
        public string Password { get; set; } = "";
    }
}
