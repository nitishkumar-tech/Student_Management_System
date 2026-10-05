using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Student_Management_System.Data;
using Student_Management_System.Models;

namespace Student_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public StudentController(StudentDbContext context)
        {
            _context = context;
        }

        // GET: api/Student
        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = _context.Students.ToList();

            return Ok(students);
        }

        // GET: api/Student/1
        [HttpGet("{id}")]
        public IActionResult GetStudent(int id)
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound("Student not found");
            }

            return Ok(student);
        }

        // POST: api/Student
        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            if (student == null)
            {
                return BadRequest("Student data is required");
            }

            _context.Students.Add(student);
            _context.SaveChanges();

            return Ok(student);
        }

        // PUT: api/Student/1
        [HttpPut("{id}")]
        public IActionResult UpdateStudent(
            int id,
            Student student)
        {
            var existingStudent = _context.Students.Find(id);

            if (existingStudent == null)
            {
                return NotFound("Student not found");
            }

            existingStudent.Name = student.Name;
            existingStudent.Email = student.Email;
            existingStudent.Age = student.Age;
            existingStudent.Course = student.Course;

            _context.SaveChanges();

            return Ok(existingStudent);
        }

        // DELETE: api/Student/1
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound("Student not found");
            }

            _context.Students.Remove(student);
            _context.SaveChanges();

            return Ok("Student deleted successfully");
        }
    }
}
