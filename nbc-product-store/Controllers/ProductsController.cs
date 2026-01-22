using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using nbc_product_store.Models;

namespace nbc_product_store.Controllers;

public class ProductsController : Controller
{
    private static List<Product>? _cachedProducts;
    private static readonly HttpClient _httpClient = new();

    [HttpGet]
    [Route("api/[controller]")]
    public async Task<ActionResult<List<Product>>> Get()
    {
        try
        {
            var response = await _httpClient.GetAsync("https://dummyjson.com/products");
            
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(500, "Failed to fetch products from external service");
            }

            var jsonContent = await response.Content.ReadAsStringAsync();
            
            using var doc = System.Text.Json.JsonDocument.Parse(jsonContent);
            var products = new List<Product>();

            if (doc.RootElement.TryGetProperty("products", out var productsArray))
            {
                foreach (var item in productsArray.EnumerateArray())
                {
                    var product = new Product
                    {
                        Id = item.GetProperty("id").GetInt32(),
                        Title = item.GetProperty("title").GetString() ?? string.Empty,
                        Description = item.GetProperty("description").GetString() ?? string.Empty,
                        Price = item.GetProperty("price").GetDecimal(),
                        Thumbnail = item.GetProperty("thumbnail").GetString() ?? string.Empty
                    };
                    products.Add(product);
                }
            }

            _cachedProducts = products;
            
            return Ok(_cachedProducts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while fetching products: {ex.Message}");
        }
    }
}
