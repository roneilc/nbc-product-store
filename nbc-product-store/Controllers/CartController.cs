using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using nbc_product_store.Models;
using nbc_product_store.Services;
using nbc_product_store.Constants;
using nbc_product_store.Models.Cart;

namespace nbc_product_store.Controllers;

[Route("/api/[controller]/[action]")]
[ApiController]
public class CartController : Controller
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpPost]
    public async Task<IActionResult> AddItem([FromBody] CartRequest request)
    {
        if (request == null || request.ProductId <= 0 || request.Quantity <= 0)
        {
            return BadRequest("Invalid request");
        }

        await _cartService.AddItemToCart(request.ProductId, request.Quantity);
        return Ok("Item added to cart");
    }

    [HttpGet]
    public IActionResult GetCart()
    {
        var items = _cartService.GetCartItems();
        return Ok(items);
    }

}
