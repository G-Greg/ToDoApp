using Newtonsoft.Json;
using react_backend.Models;
using System.Linq;
using System.Net.Http.Json;
using Xunit;


namespace react_backend.Test
{
    public class TodoItemControllerTest
    {

        private static readonly TodoItem[] TestTodoItems = new[]
        {
            new TodoItem(){ColumnIndex = 0, CustomOrder = 0, Priority = 1, Title = "test title", Description =  "test desc", Date =  "2022.05.08"},
            new TodoItem(){ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test title2", Description =  "test desc2", Date =  "2022.05.08"}
        };

        [Fact]
        public async void GetTodoItemTest()
        {
            using (var testScope = TestWebAppFactory.Create())
            {
                testScope.AddSeedEntities(TestTodoItems);
                
                var client = testScope.CreateClient();
                var actual = testScope.GetDbTableContent<TodoItem>();
                var response = await client.GetAsync("/api/todoitems/1");
                var contents = response.Content.ReadAsStringAsync().Result;
                var resTodoItem = JsonConvert.DeserializeObject<TodoItem>(contents);

                Assert.Equal("test title", resTodoItem?.Title);
            }
        }

        [Fact]
        public async void PostTodoItemTest()
        {
            using (var testScope = TestWebAppFactory.Create())
            {
                var client = testScope.CreateClient();
                var response = await client.PostAsJsonAsync("/api/todoitems", new TodoItem { ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test title3", Description = "test desc3", Date = "2022.05.08" });

                Assert.Equal(System.Net.HttpStatusCode.Created, response.StatusCode);
            }
        }

        [Fact]
        public async void PutTodoItemTest()
        {
            using (var testScope = TestWebAppFactory.Create())
            {
                testScope.AddSeedEntities(TestTodoItems);
                var client = testScope.CreateClient();

                var recordToUpdate = testScope.GetDbTableContent<TodoItem>().First();
                recordToUpdate.Title = "Updated title";

                var response = await client.PutAsJsonAsync($"/api/todoitems/{recordToUpdate.Id}", recordToUpdate);
                response.EnsureSuccessStatusCode();

                var recordUpdated = await client.GetAsync($"/api/todoitems/{recordToUpdate.Id}");
                var contents = recordUpdated.Content.ReadAsStringAsync().Result;
                var resTodoItem = JsonConvert.DeserializeObject<TodoItem>(contents);

                Assert.Equal("Updated title", resTodoItem?.Title);
            }
        }

        [Fact]
        public async void DeleteTodoItemTest()
        {
            using (var testScope = TestWebAppFactory.Create())
            {
                testScope.AddSeedEntities(TestTodoItems);
                var client = testScope.CreateClient();

                var beforeCount = testScope.GetDbTableContent<TodoItem>().Count;
                var response = await client.DeleteAsync("/api/todoitems/1");
                response.EnsureSuccessStatusCode();

                var actualCount = testScope.GetDbTableContent<TodoItem>().Count;
                Assert.Equal(beforeCount-1, actualCount);
            }
        }
    }
}