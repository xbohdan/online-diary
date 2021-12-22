using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public partial class Note
    {
        public int NoteId { get; set; }

        public int? UserId { get; set; }

        public string Heading { get; set; } = null!;

        public string Content { get; set; } = null!;

        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ModificationDate { get; set; }
    }
}
