using Microsoft.EntityFrameworkCore;
using react_backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

/*
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
*/
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("TodoContext")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    //app.UseSwagger();
    //app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope()) 
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}

    app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
