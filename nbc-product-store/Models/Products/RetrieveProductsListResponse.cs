using System.Collections.Generic;

namespace nbc_product_store.Models;

public class RetrieveProductsListResponse
{
    public List<Product> Products { get; set; }
    public string StatusCode { get; set; }
    public string StatusDescription { get; set; }

}