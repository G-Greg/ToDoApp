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
                        Title = "First title",
                        Priority = 1,
                        Description = "First Description",
                        Date = "2020.00.00",
                    });
                context.SaveChanges();
            }
        }
    }
}
