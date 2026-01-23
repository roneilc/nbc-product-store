using nbc_product_store.Constants;
using nbc_product_store.Models.Cart;
using nbc_product_store.Models.Error;

namespace nbc_product_store.Utilities
{
    public static class ValidationUtility
    {
        public static ServiceError ValidateCartRequest(CartRequest request)
        {
            ServiceError se = null;

            if (request == null || request.ProductId <= 0 || request.Quantity <= 0)
            {
                return new ServiceError(AppConstants.INVALID_REQUEST_STATUS_CODE, AppConstants.INVALID_REQUEST_STATUS_DESCRIPTION);
            }

            return se;
        }

    }
}