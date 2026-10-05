using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Student_Management_System.Data;
using Student_Management_System.Models;

namespace Student_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public AuthController(StudentDbContext context)
        {
            _context = context;
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required");
            }

            var existingUser = _context.Users
                .FirstOrDefault(x => x.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest("Email already registered");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Registration successful"
            });
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            if (user == null)
            {
                return BadRequest("Login data is required");
            }

            var existingUser = _context.Users
                .FirstOrDefault(x =>
                    x.Email == user.Email &&
                    x.Password == user.Password);

            if (existingUser == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(new
            {
                message = "Login successful",
                userId = existingUser.Id,
                name = existingUser.Name,
                email = existingUser.Email
            });
        }
    }
}