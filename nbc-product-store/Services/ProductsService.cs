using nbc_product_store.Models;

namespace nbc_product_store.Services;

public class ProductsService : IProductsService
{
    private static List<Product>? _productsList;
    private static readonly HttpClient _httpClient = new();

    public async Task<List<Product>> GetProductsAsync()
    {
        if (_productsList != null)
        {
            return _productsList; //Return cache
        }
        //Fetch products from dummyjosn
        try
        {
            var response = await _httpClient.GetAsync("https://dummyjson.com/products");

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Unsuccesful Products Fetch. Status Code: {response.StatusCode}");
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

            _productsList = products;
            return _productsList;
        }

        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            return new List<Product>();
        }
    }
}