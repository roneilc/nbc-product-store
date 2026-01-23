using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using nbc_product_store.Constants;
using nbc_product_store.Models.Error;

namespace nbc_product_store.Middleware
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Headers.ContainsKey(AppConstants.AUTHORIZATION_HEADER) || string.IsNullOrWhiteSpace(context.Request.Headers[AppConstants.AUTHORIZATION_HEADER].ToString()))
            {
                var serviceError = new ServiceError(AppConstants.AUTHORIZATION_ERROR_CODE, AppConstants.AUTHORIZATION_ERROR_DESCRIPTION);
                var serviceErrorJson = JsonSerializer.Serialize(serviceError);

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(serviceErrorJson);
                return;
            }

            await _next(context);
        }
    }
}
