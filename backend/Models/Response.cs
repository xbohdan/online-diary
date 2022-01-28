using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models.DTOs
{
    public class Response
    {
        [Required]
        public string Token { get; set; } = "";

        [Required]
        public DateTime Expiration { get; set; }
    }
}
