using Microsoft.EntityFrameworkCore;

namespace react_backend.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new TodoContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<TodoContext>>()))
            {
                // Look for any Todos.
                if (context.TodoItems.Any())
                {
                    return;   // DB has been seeded
                }

                context.TodoItems.AddRange(
                    new TodoItem
                    {
                        Id = 1,
                        ColumnIndex = 0,
                        Title = "The new note",
                        Priority = 1,
                        Description = "This note from the database",
                        Date = "2020.01.01.",
                    });
                context.SaveChanges();
            }
        }
    }
}
