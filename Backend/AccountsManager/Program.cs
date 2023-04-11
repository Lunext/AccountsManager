using BusinessLogic.Repositories;
using BusinessLogic.Validations;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

}); 
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer("name=DefaultConnection");
});




builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", app =>
    {
        app.AllowAnyOrigin();
        app.AllowAnyHeader();
        app.AllowAnyMethod();
    });
});

builder.Services.AddScoped<IAccountRepository, AccountRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();

}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error ocurred during migration");
}

app.Run();
