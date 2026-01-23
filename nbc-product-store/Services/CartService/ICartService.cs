using nbc_product_store.Models;
using nbc_product_store.Models.Cart;

namespace nbc_product_store.Services;

public interface ICartService
{
    Task AddItem (CartRequest request);
    List<CartItem> GetCartItems();
    void RemoveItem(int productId);
    void ClearCart();
}