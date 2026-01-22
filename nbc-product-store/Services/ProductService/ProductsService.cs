using nbc_product_store.Constants;
using nbc_product_store.Models;
using Newtonsoft.Json;

namespace nbc_product_store.Services;

public class ProductsService : IProductsService
{
    private List<Product>? _productsList;
    private static readonly HttpClient _httpClient = new();

    public async Task<List<Product>> GetProductsAsync()
    {   
        if (_productsList != null)
        {
            return _productsList; //Return cache
        }

        try
        {
            var response = await _httpClient.GetAsync(AppConstants.DUMMY_JSON_PRODUCTS_URL);

            if (!response.IsSuccessStatusCode || response.Content == null)
            {
                Console.WriteLine($"Unsuccessful Products Fetch. Status Code: {response.StatusCode}");
                return new List<Product>();
            }
            //Successful fetch
            else
            {                
                List<Product> products = ProductsServiceHelper.DeserializeDummyJsonProducts(await response.Content.ReadAsStringAsync());
                _productsList = products; //Cache
                return _productsList;
            }
        }   

        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            return new List<Product>();
        }
    }
}