namespace nbc_product_store.Constants;

public static class AppConstants
{

    //Authorization
    public static readonly string AUTHORIZATION_HEADER = "Authorization";
    public static readonly string AUTHORIZATION_ERROR_CODE = "Authorization error";
    public static readonly string AUTHORIZATION_ERROR_DESCRIPTION = "Invalid authentication";

    //Urls
    public static readonly string DUMMY_JSON_PRODUCTS_URL = "DUMMY_JSON_PRODUCTS_URL";

    //Controller Codes
    public static readonly string RESPONSE_STATUS_CODE_SUCCESS = "0";
    public static readonly string RESPONSE_STATUS_DESCRIPTION_SUCCESS = "success";
    public static readonly string EMPTY_CART_STATUS_CODE = "0";
    public static readonly string EMPTY_CART_STATUS_DESCRIPTION = "Empty Cart";
    public static readonly string RESPONSE_STATUS_CODE_FAIL = "1";
    public static readonly string RESPONSE_STATUS_DESCRIPTION_FAIL = "fail";
    public static readonly string INVALID_REQUEST_STATUS_CODE = "1";
    public static readonly string INVALID_REQUEST_STATUS_DESCRIPTION = "Invalid request";


    //Backend API Generic
    public static readonly string HTTP_ERROR = "HTTP_ERROR";

    //Dummy Product API
    public static readonly string DUMMY_JSON_FAIL = "Failed to fetch products from the Dummy Json API.";


}

