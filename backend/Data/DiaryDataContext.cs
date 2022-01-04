using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using DiaryApi.Models;

namespace DiaryApi.Data
{
    public partial class DiaryDataContext : DbContext
    {
        public DiaryDataContext()
        {
        }

        public DiaryDataContext(DbContextOptions<DiaryDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Note> Notes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasIndex(e => new { e.UserId, e.InitialDate }, "AK_Note")
                    .IsUnique();

                entity.Property(e => e.Heading).HasMaxLength(100);

                entity.Property(e => e.InitialDate).HasColumnType("date");

                entity.Property(e => e.ModificationDate).HasColumnType("date");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
