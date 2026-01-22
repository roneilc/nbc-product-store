using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using nbc_product_store.Models;
using nbc_product_store.Services;
using nbc_product_store.Constants;

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

}
