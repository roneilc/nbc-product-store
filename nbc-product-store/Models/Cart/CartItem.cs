namespace nbc_product_store.Models.Cart;

public class CartItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Thumbnail { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}
