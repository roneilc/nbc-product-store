namespace nbc_product_store.Models.Cart;

public class CartResponse
{
    public ProductInfo ProductInfo { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}

public class ProductInfo
{
    public string ProductId { get; set;}
    public string Title { get; set;}
    public decimal Price { get; set;}
}
