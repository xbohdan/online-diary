using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public class Account
    {
        [Required]
        public string UserName { get; set; } = "";

        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; } = "";
    }
}
