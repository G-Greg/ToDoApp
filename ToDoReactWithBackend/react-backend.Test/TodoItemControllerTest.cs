using Microsoft.AspNetCore.Mvc.Testing;
using react_backend.Controllers;
using react_backend.Models;
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
                var client = testScope.CreateClient();
                testScope.AddSeedEntities(TestTodoItems);
                //await client.PostAsJsonAsync("/api/todoitems", new TodoItem { ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test title2", Description = "test desc2", Date = "2022.05.08" });
                var actual = testScope.GetDbTableContent<TodoItem>();
                var response = await client.GetAsync("/api/todoitems");

                Assert.Equal("test title2", response.ToString());
            }
        }

        [Fact]
        public async void PostTodoItemTest()
        {
            using (var testScope = TestWebAppFactory.Create())
            {
                var client = testScope.CreateClient();
                var response = await client.PostAsJsonAsync("/api/todoitems", new TodoItem { ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test title2", Description = "test desc2", Date = "2022.05.08" });

                Assert.Equal(System.Net.HttpStatusCode.Created, response.StatusCode);
            }
        }

        [Fact]
        public async void PutTodoItemTest()
        {
            using (var testScope = TestWebAppFactory.Create())
            {
                var client = testScope.CreateClient();
                var response = await client.PostAsJsonAsync("/api/todoitems", new TodoItem { ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test title2", Description = "test desc2", Date = "2022.05.08" });

                Assert.Equal(System.Net.HttpStatusCode.Created, response.StatusCode);
            }
        }
    }
}