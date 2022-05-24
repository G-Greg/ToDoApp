using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace react_backend.Models
{
    public class TodoContext : DbContext, ITodoContext
    {

        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<TodoItem>().ToTable("Todo");
        }
    }
}
