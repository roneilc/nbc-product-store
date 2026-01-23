using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using nbc_product_store.Constants;

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
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("{\"error\":\"Missing Authorization\"}");
                return;
            }

            await _next(context);
        }
    }
}
