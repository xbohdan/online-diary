using System;
using System.Collections.Generic;

namespace DiaryApi.Models
{
    public partial class Entry
    {
        public int EntryId { get; set; }
        public int PersonId { get; set; }
        public string Title { get; set; } = null!;
        public string Note { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }
    }
}
