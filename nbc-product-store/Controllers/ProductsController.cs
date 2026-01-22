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

            if (serviceResponse != null && serviceResponse.Count > 0)
            {   
                //Successful fetch
                res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_SUCCESS;
                res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_SUCCESS;
                res.Products = serviceResponse;
            }
            else
            {
                res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
                res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
                res.Products = new List<Product>();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            res.StatusCode = AppConstants.RESPONSE_STATUS_CODE_FAIL;
            res.StatusDescription = AppConstants.RESPONSE_STATUS_DESCRIPTION_FAIL;
            res.Products = new List<Product>();
        }

        return Json(res);
    }
}
