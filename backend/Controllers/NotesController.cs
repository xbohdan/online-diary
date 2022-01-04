using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DiaryApi.Data;
using DiaryApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace DiaryApi.Controllers
{
    [ApiController, Authorize, Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly DiaryDataContext _context;

        public NotesController(DiaryDataContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes.ToListAsync();
        }

        // GET: api/Notes/5
        [HttpGet("{initialDate}")]
        public async Task<ActionResult<Note>> GetNote(DateTime initialDate)
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();
            }

            var note = await FindNoteAsync(initialDate);
            if (note == null)
            {
                return NotFound();
            }

            var noteDTO = new NoteDTO
            {
                Heading = note.Heading,
                Content = note.Content
            };

            return Ok(noteDTO);
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{initialDate}")]
        public async Task<IActionResult> PutNote(DateTime initialDate, [Bind("Heading, Content, ModificationDate")] Note note)
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();
            }

            var noteToUpdate = await FindNoteAsync(initialDate);
            if (noteToUpdate == null)
            {
                return NotFound();
            }

            noteToUpdate.Heading = note.Heading;
            noteToUpdate.Content = note.Content;
            noteToUpdate.ModificationDate = note.ModificationDate;

            try
            {
                _context.Update(noteToUpdate);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(initialDate))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var noteDTO = new NoteDTO
            {
                Heading = note.Heading,
                Content = note.Content
            };

            return Ok(noteDTO);
        }

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote([Bind("Heading, Content, InitialDate")] Note note)
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();
            }

            note.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            var noteDTO = new NoteDTO
            {
                Heading = note.Heading,
                Content = note.Content
            };

            return CreatedAtAction(nameof(GetNote), new { initialDate = note.InitialDate.ToString("yyyy-MM-dd") }, noteDTO);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{initialDate}")]
        public async Task<IActionResult> DeleteNote(DateTime initialDate)
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();
            }

            var note = await FindNoteAsync(initialDate);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteExists(DateTime initialDate)
        {
            return _context.Notes
                .Any(x => x.UserId == User.FindFirstValue(ClaimTypes.NameIdentifier)
                && x.InitialDate == initialDate);
        }

        private async Task<Note?> FindNoteAsync(DateTime initialDate)
        {
            return await _context.Notes
                .Where(x => x.UserId == User.FindFirstValue(ClaimTypes.NameIdentifier)
                && x.InitialDate == initialDate)
                .FirstOrDefaultAsync();
        }
    }
}
