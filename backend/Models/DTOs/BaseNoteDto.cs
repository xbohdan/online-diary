using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DiaryApi.Models
{
    public class BaseNoteDto
    {
        [DataType(DataType.Text)]
        [Required]
        public string Heading { get; set; } = "";

        [DataType(DataType.MultilineText)]
        [Required]
        public string Content { get; set; } = "";
    }
}
