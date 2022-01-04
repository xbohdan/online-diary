using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DiaryApi.Models
{
    public partial class Note
    {
        public int NoteId { get; set; }

        public string UserId { get; set; } = "";

        [DataType(DataType.Text), Required]
        public string Heading { get; set; } = "";

        [DataType(DataType.MultilineText), Required]
        public string Content { get; set; } = "";

        [DataType(DataType.Date)]
        public DateTime InitialDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ModificationDate { get; set; }
    }
}
