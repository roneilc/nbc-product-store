using nbc_product_store.Models;
using Newtonsoft.Json;

namespace nbc_product_store.Services;

public class ProductsServiceHelper
{
    public static ProductsAPIResponse DeserializeDummyJsonProducts(string jsonContent)
    {
        ProductsAPIResponse response = null;
        if (!String.IsNullOrEmpty(jsonContent))
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.NullValueHandling = NullValueHandling.Ignore;
            settings.MissingMemberHandling = MissingMemberHandling.Ignore;
            settings.TypeNameHandling = TypeNameHandling.Auto;
            settings.ConstructorHandling = ConstructorHandling.AllowNonPublicDefaultConstructor;
            settings.DefaultValueHandling = DefaultValueHandling.Ignore;

            response = JsonConvert.DeserializeObject<ProductsAPIResponse>(jsonContent, settings);
        }

        return response;
    }
}