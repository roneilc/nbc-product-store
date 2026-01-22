using Mc4b.Models.Error;
using nbc_product_store.Constants;
using nbc_product_store.Models;
using Newtonsoft.Json;

namespace nbc_product_store.Services;

public class ProductsService : IProductsService
{
    private ProductsAPIResponse _productsAPIResponse;
    private static readonly HttpClient _httpClient = new();

    public async Task<ProductsAPIResponse> GetProductsAsync()
    {   
        ProductsAPIResponse productsAPIResponse = new ProductsAPIResponse
        {
            Products = new List<Product>(),
            Error = new ServiceError()
        }; 

        if (_productsAPIResponse != null)
        {
            return _productsAPIResponse; //Return cached field
        }

        try
        {
            var response = await _httpClient.GetAsync(AppConstants.DUMMY_JSON_PRODUCTS_URL);

            if (!response.IsSuccessStatusCode || response.Content == null)
            {
                productsAPIResponse.Error.ErrorCode = AppConstants.HTTP_ERROR;
                productsAPIResponse.Error.ErrorMessage = AppConstants.DUMMY_JSON_FAIL;
            
                Console.WriteLine($"Unsuccessful Products Fetch. Status Code: {response.StatusCode}");
            }
            //Successful fetch
            else
            {                
                ProductsAPIResponse res = ProductsServiceHelper.DeserializeDummyJsonProducts(response.Content.ReadAsStringAsync().Result);
                productsAPIResponse.Products = res.Products;
                productsAPIResponse.Error = null;
                _productsAPIResponse = productsAPIResponse; //Cache
            }

            return productsAPIResponse;
        }   

        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            return productsAPIResponse;
        }
    }
}