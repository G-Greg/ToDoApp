using Microsoft.EntityFrameworkCore;
using react_backend.Controllers;
using react_backend.Models;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Linq;

namespace react_backend.Test
{
    public class UnitTest : DbContext
    {
        TodoItemsController todoItemsController;

        public UnitTest(){
            var testItems = new List<TodoItem>();
            testItems.Add(new TodoItem() { ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test", Description = "desc", Date = "2022.05.08" });

            var testTodoMock = MockDbSet(testItems);
            Mock<ITodoContext> mockRepo = new();


            mockRepo.Setup(repo => repo.TodoItems).Returns(testTodoMock.Object);

            this.todoItemsController = new TodoItemsController(mockRepo.Object);
            
        }

        [Fact]
        public void TestPostItem() {
            TodoItem todoItem = new TodoItem() { ColumnIndex = 0, CustomOrder = 2, Priority = 2, Title = "test2", Description = "desc2", Date = "2022.05.08" };
            var result = todoItemsController.PostTodoItem(todoItem).Status;
            Assert.Equal(System.Threading.Tasks.TaskStatus.RanToCompletion, result);
        }

        [Fact]
        public void TestItemIsExist()
        {
            TodoItem todoItem = new TodoItem() { ColumnIndex = 0, CustomOrder = 1, Priority = 2, Title = "test title2", Description = "test desc2", Date = "2022.05.08" };
            _ = todoItemsController.PostTodoItem(todoItem);
            var result = todoItemsController.TodoItemExists(todoItem.Id);
            Assert.True(result);
        }

        Mock<DbSet<T>> MockDbSet<T>(IEnumerable<T> list) where T : class, new()
        {
            IQueryable<T> queryableList = list.AsQueryable();
            Mock<DbSet<T>> dbSetMock = new Mock<DbSet<T>>();
            dbSetMock.As<IQueryable<T>>().Setup(x => x.Provider).Returns(queryableList.Provider);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.Expression).Returns(queryableList.Expression);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.ElementType).Returns(queryableList.ElementType);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.GetEnumerator()).Returns(() => queryableList.GetEnumerator());
            dbSetMock.Setup(d => d.Add(It.IsAny<T>()));
        
            return dbSetMock;
        }
    }
}
