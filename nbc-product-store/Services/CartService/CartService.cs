using nbc_product_store.Constants;
using nbc_product_store.Models;
using nbc_product_store.Models.Cart;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;

namespace nbc_product_store.Services;

public class CartService : ICartService
{
    private static readonly List<CartItem> _cartItems = new();
    private readonly IProductsService _productsService;

    public CartService(IProductsService productsService)
    {
        _productsService = productsService;
    }

    public async Task AddItem([FromBody] CartRequest request)
    {
        List<Product> products = await _productsService.GetProductsAsync();

        var product = products.FirstOrDefault(p => p.Id == request.ProductId);
        if (product == null)
        {
            // Product not found
            return;
        }

        var existingItem = _cartItems.FirstOrDefault(c => c.Id == request.ProductId);
        if (existingItem != null)
        {
            existingItem.Quantity += request.Quantity;
        }
        else
        {
            var newItem = new CartItem
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                Thumbnail = product.Thumbnail,
                Quantity = request.Quantity
            };

            _cartItems.Add(newItem);
        }
    }

    public List<CartItem> GetCartItems()
    {
        return _cartItems.ToList();
    }

    public void RemoveItem(int productId)
    {
        var item = _cartItems.FirstOrDefault(c => c.Id == productId);
        if (item != null)
        {
            _cartItems.Remove(item);
        }
    }

    public void ClearCart()
    {
        _cartItems.Clear();
    }
}