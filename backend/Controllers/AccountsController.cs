using DiaryApi.Data;
using DiaryApi.Models;
using DiaryApi.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DiaryApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class AccountsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _manager;

        public AccountsController(IConfiguration configuration, UserManager<ApplicationUser> manager)
        {
            _configuration = configuration;
            _manager = manager;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(Response), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Register([FromBody] Account model)
        {
            if (await _manager.FindByNameAsync(model.UserName) != null)
            {
                return Conflict();
            }

            ApplicationUser user = new()
            {
                UserName = model.UserName,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _manager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(x => x.Description));
            }

            return ProvideToken(user);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(Response), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] Account model)
        {
            var user = await _manager.FindByNameAsync(model.UserName);

            if (user == null || !await _manager.CheckPasswordAsync(user, model.Password))
            {
                return Unauthorized();
            }

            return ProvideToken(user);
        }

        private IActionResult ProvideToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                issuer: _configuration["Jwt:Issuer"],
                signingCredentials: new(key, SecurityAlgorithms.HmacSha256)
                );

            return Ok(new Response
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            });
        }
    }
}
