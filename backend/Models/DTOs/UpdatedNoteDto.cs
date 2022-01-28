using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public class UpdatedNoteDto : BaseNoteDto
    {
        [DataType(DataType.Date)]
        [Required]
        public DateTime ModificationDate { get; set; }
    }
}
