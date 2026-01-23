using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nbc_product_store.Services;
using nbc_product_store.Models.Cart;
using nbc_product_store.Models.Error;
using nbc_product_store.Utilities;

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
    public async Task<JsonResult> AddItem([FromBody] CartRequest request)
    {
        ServiceError se = ValidationUtility.ValidateCartRequest(request);

        if (se != null)
        {
            //Invalid request
            Response.StatusCode = StatusCodes.Status400BadRequest;
            return Json(se);
        }

        await _cartService.AddItem(request);

        return Json(new { message = "Item added to cart" });
    }

    [HttpGet]
    public IActionResult GetCart()
    {
        var cartItems = _cartService.GetCartItems();
        return Ok(cartItems);
    }

}
