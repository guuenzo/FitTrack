using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using System.Text;

namespace FitTrack_API.Utils.Translate
{
    public static class AzureTranslateService
    {
        private static readonly string SubscriptionKey = "ac6473e4076e464083933616ed242061";

        private static readonly string EndPoint = "https://api.cognitive.microsofttranslator.com/";

        private static readonly string Location = "brazilsouth";

        public static async Task<string> TrasnslatePTToEN(string textToTranslate)
        {
            try
            {
                // Input and output languages are defined as parameters.
                string route = "/translate?api-version=3.0&from=pt&to=en";

                object[] body = new object[] { new { Text = textToTranslate } };
                var requestBody = JsonConvert.SerializeObject(body);

                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage())
                {
                    // Build the request.
                    request.Method = HttpMethod.Post;
                    request.RequestUri = new Uri(EndPoint + route);
                    request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                    request.Headers.Add("Ocp-Apim-Subscription-Key", SubscriptionKey);
                    // location required if you're using a multi-service or regional (not global) resource.
                    request.Headers.Add("Ocp-Apim-Subscription-Region", Location);

                    // Send the request and get response.
                    HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                    // Read response as a string.
                    string result = await response.Content.ReadAsStringAsync();




                    return result;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static async Task<string> TrasnslateEnToPt(string textToTranslate)
        {
            try
            {
                // Input and output languages are defined as parameters.
                string route = "/translate?api-version=3.0&from=en&to=pt";

                object[] body = new object[] { new { Text = textToTranslate } };
                var requestBody = JsonConvert.SerializeObject(body);

                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage())
                {
                    // Build the request.
                    request.Method = HttpMethod.Post;
                    request.RequestUri = new Uri(EndPoint + route);
                    request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                    request.Headers.Add("Ocp-Apim-Subscription-Key", SubscriptionKey);
                    // location required if you're using a multi-service or regional (not global) resource.
                    request.Headers.Add("Ocp-Apim-Subscription-Region", Location);

                    // Send the request and get response.
                    HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                    // Read response as a string.
                    string result = await response.Content.ReadAsStringAsync();




                    return result;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
