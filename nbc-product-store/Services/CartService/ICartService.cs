using nbc_product_store.Models;
using nbc_product_store.Models.Cart;

namespace nbc_product_store.Services;

public interface ICartService
{
    Task AddItemToCart(int productId, int quantity);
    List<CartItem> GetCartItems();
    void RemoveItemFromCart(int productId);
    void ClearCart();
}