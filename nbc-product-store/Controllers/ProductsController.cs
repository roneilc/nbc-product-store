using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using nbc_product_store.Models;
using nbc_product_store.Services;
using nbc_product_store.Constants;

namespace nbc_product_store.Controllers;

[Route("/api/[controller]/[action]")]
[ApiController]
public class ProductsController : Controller
{
    private readonly IProductsService _productsService;

    public ProductsController(IProductsService productsService)
    {
        _productsService = productsService;
    }

    [HttpGet]
    public async Task<JsonResult> RetrieveProductsList()
    {
        RetrieveProductsListResponse res = new RetrieveProductsListResponse();
        try
        {
            var serviceResponse = await _productsService.GetProductsAsync();

            if (serviceResponse != null)
            {
                if (serviceResponse.Error != null)
                {
                    res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
                    res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
                }
                else
                {
                    res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_SUCCESS;
                    res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_SUCCESS;      
                }

            }

            res.Products = serviceResponse.Products;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
        }

        return Json(res);
    }
}
