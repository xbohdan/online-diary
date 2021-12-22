using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public partial class Entry
    {
        public int EntryId { get; set; }

        public int? UserId { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Note { get; set; } = null!;

        [Required]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ModificationDate { get; set; }
    }
}
