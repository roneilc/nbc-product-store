using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nbc_product_store.Services;
using nbc_product_store.Constants;
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
        var res = new RetrieveCartResponse();

        try
        {
            ServiceError se = ValidationUtility.ValidateCartRequest(request);

            if (se != null)
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
                res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
                res.Error = se;
                res.Items = new List<CartItem>();
                return Json(res);
            }

            await _cartService.AddItem(request);

            var items = _cartService.GetCartItems();
            if (items != null && items.Count > 0)
            {
                res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_SUCCESS;
                res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_SUCCESS;
                res.Items = items;
            }
            else
            {
                res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
                res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            Response.StatusCode = StatusCodes.Status500InternalServerError;
            res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
            res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
            res.Error = new ServiceError(AppConstants.HTTP_ERROR, ex.Message);
        }

        return Json(res);
    }

    [HttpGet]
    public JsonResult GetCart()
    {
        var res = new RetrieveCartResponse();
        try
        {
            var cartItems = _cartService.GetCartItems();
            if (cartItems != null && cartItems.Count > 0)
            {
                res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_SUCCESS;
                res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_SUCCESS;
                res.Items = cartItems;
            }
            else
            {
                res.StatusCode = AppConstants.EMPTY_CART_STATUS_CODE;
                res.StatusDescription = AppConstants.EMPTY_CART_STATUS_DESCRIPTION;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            Response.StatusCode = StatusCodes.Status500InternalServerError;
            res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
            res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
            res.Error = new ServiceError(AppConstants.HTTP_ERROR, ex.Message);
        }

        return Json(res);
    }

}
