using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // API controller does not return template/html, only data in JSON
    [Route("api/[controller]")] // localhost:5000/api/members
    [ApiController]
    // All the services that are registered in Program.cs are available for DI
    public class MembersController(AppDbContext context) : ControllerBase
    {
        // .NET make new instance of this controller for each request, looks into constructor and also makes new instance of AppDbContext
        [HttpGet] // GET: api/members
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = await context.Users.ToListAsync();
            return members; // 200 status code
        }

        [HttpGet("{id}")] // GET: api/members/bob-id
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var member = await context.Users.FindAsync(id);
            if (member == null) return NotFound(); // 404 status code
            return member; // 200 status code
        }
    }
}
