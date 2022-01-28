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
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly DiaryDataContext _context;

        public NotesController(DiaryDataContext context)
        {
            _context = context;
        }

        // GET: api/Notes/5
        [HttpGet("{initialDate}")]
        [ProducesResponseType(typeof(BaseNoteDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

            var baseNoteDto = new BaseNoteDto
            {
                Heading = note.Heading,
                Content = note.Content
            };

            return Ok(baseNoteDto);
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{initialDate}")]
        [ProducesResponseType(typeof(BaseNoteDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutNote(DateTime initialDate, UpdatedNoteDto updatedNoteDto)
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

            note.Heading = updatedNoteDto.Heading;
            note.Content = updatedNoteDto.Content;
            note.ModificationDate = updatedNoteDto.ModificationDate;

            try
            {
                _context.Update(note);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await NoteExistsAsync(initialDate))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var baseNoteDto = new BaseNoteDto
            {
                Heading = updatedNoteDto.Heading,
                Content = updatedNoteDto.Content
            };

            return Ok(baseNoteDto);
        }

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(typeof(BaseNoteDto), StatusCodes.Status201Created)]
        public async Task<ActionResult<Note>> PostNote(CreatedNoteDto createdNoteDto)
        {
            if (User.Identity?.IsAuthenticated != true)
            {
                return Unauthorized();
            }

            var note = new Note
            {
                Heading = createdNoteDto.Heading,
                Content = createdNoteDto.Content,
                InitialDate = createdNoteDto.InitialDate,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            var baseNoteDto = new BaseNoteDto
            {
                Heading = createdNoteDto.Heading,
                Content = createdNoteDto.Content
            };

            return CreatedAtAction(nameof(GetNote), new { initialDate = note.InitialDate.ToString("yyyy-MM-dd") }, baseNoteDto);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{initialDate}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        private async Task<bool> NoteExistsAsync(DateTime initialDate)
        {
            return await _context.Notes
                .AnyAsync(x => x.UserId == User.FindFirstValue(ClaimTypes.NameIdentifier)
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
