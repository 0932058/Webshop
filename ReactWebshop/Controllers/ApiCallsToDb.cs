using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Diagnostics;
using Newtonsoft.Json;

namespace Controllers
{
    //This is the default route of the API. 
    [Route("api/[controller]")]
    public class ApiCallController : Controller{
        private readonly normieContext _context;

        public ApiCallController(normieContext context){
            this._context = context;
        }
        [HttpGet]
        public  string  GetApiResults(){
            
            var client = new HttpClient(){BaseAddress= new Uri("https://api-2445582011268.apicast.io")};
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("user-key", "545ca34a4ad8dda86b8a95071ff6b5c4");
            client.DefaultRequestHeaders.TryAddWithoutValidation("user-key", "545ca34a4ad8dda86b8a95071ff6b5c4");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response =   client.GetAsync("/games/?fields=name,url,cover,summary,genres,publishers,developers&limit=50").Result;           
            var content =  response.Content.ReadAsStringAsync().Result;

            dynamic convertedJson = JsonConvert.DeserializeObject(content);
            var wut = "";
            int pk = 500;
            foreach (var item in convertedJson)
            {
                var newEntity = new ToBeAddedProducts(){
                    productNaam = item.name,
                    productUitgever = "",
                    productOmschr = "",
                    aantalInVooraad = 0,
                    productPrijs = 0,
                    productOntwikkelaar = "",
                    productImg = "", //item.cover.url,
                    productGenre =  "",
                    consoleType = ""
                    
                };
                pk = pk +1;
                newEntity.ToBeAddedProductsId = pk;
                this._context.ToBeAddedProducts.Add(newEntity);
                this._context.SaveChanges();                       
            }
            return wut;
        }
    }
}
