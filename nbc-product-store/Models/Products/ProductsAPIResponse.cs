using System.Collections.Generic;
using Mc4b.Models.Error;

namespace nbc_product_store.Models;

public class ProductsAPIResponse
{
    public List<Product> Products { get; set; }
    public ServiceError Error { get; set; }
    
}