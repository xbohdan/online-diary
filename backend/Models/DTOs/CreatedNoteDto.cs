using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public class CreatedNoteDto : BaseNoteDto
    {
        [DataType(DataType.Date)]
        [Required]
        public DateTime InitialDate { get; set; }
    }
}
