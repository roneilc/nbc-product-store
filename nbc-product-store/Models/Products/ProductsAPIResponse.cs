using System.Collections.Generic;
using nbc_product_store.Models.Error;

namespace nbc_product_store.Models;

public class ProductsAPIResponse
{
    public List<Product> Products { get; set; }
    public ServiceError Error { get; set; }
    
}