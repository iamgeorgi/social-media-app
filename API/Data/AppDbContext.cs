using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    // this is a row and each property will represent a column in the database
    public DbSet<AppUser> Users { get; set; }
}
