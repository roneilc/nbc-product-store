using System.Collections.Generic;
using nbc_product_store.Models.Error;

namespace nbc_product_store.Models.Cart;

public class RetrieveCartResponse
{
    public List<CartItem> Items { get; set; }
    public string StatusCode { get; set; }
    public string StatusDescription { get; set; }
    public ServiceError Error { get; set; }
}
