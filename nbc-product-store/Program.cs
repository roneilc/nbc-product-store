using nbc_product_store.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Services Dependency Injection
builder.Services.AddSingleton<IProductsService, ProductsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();

// Serve static files from wwwroot/browser (Angular output)
app.UseDefaultFiles(new DefaultFilesOptions
{
    DefaultFileNames = new List<string> { "index.html" },
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser"))
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser"))
});

app.UseRouting();
app.UseAuthorization();

// Map API controllers
app.MapControllers();

app.Use(async (context, next) =>
{
    Console.WriteLine($"Fallback triggered for: {context.Request.Path}");
    await next();
});
app.MapFallbackToFile("browser/index.html");

app.Run();
