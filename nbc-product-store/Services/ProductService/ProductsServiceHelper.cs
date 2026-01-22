using nbc_product_store.Models;
using Newtonsoft.Json;

namespace nbc_product_store.Services;

public class ProductsServiceHelper
{
    public static List<Product> DeserializeDummyJsonProducts(string jsonContent)
    {
        List<Product> productsList = null;
        if (!String.IsNullOrEmpty(jsonContent))
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            settings.MissingMemberHandling = MissingMemberHandling.Ignore;
            settings.TypeNameHandling = TypeNameHandling.Auto;
            settings.ConstructorHandling = ConstructorHandling.AllowNonPublicDefaultConstructor;
            settings.DefaultValueHandling = DefaultValueHandling.Ignore;

            var response = JsonConvert.DeserializeObject<ProductsResponse>(jsonContent, settings);
            productsList = response?.Products;
        }

        return productsList ?? new List<Product>();
    }
}