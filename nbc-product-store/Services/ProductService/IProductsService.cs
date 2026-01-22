using nbc_product_store.Models;

namespace nbc_product_store.Services;

public interface IProductsService
{
    Task<List<Product>> GetProductsAsync();
}