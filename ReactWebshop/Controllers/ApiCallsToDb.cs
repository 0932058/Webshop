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
using Microsoft.EntityFrameworkCore;




//This controller was used to implement new database entities via an api

namespace Controllers
{
    [Route("api/[controller]")]
    public class ApiCallController : Controller{
        private readonly normieContext _context;

        public ApiCallController(normieContext context){
            this._context = context;
        }

        public int GivePK(){
            int possiblePK = 1;
            while(this._context.ToBeAddedProducts.Where((a) => a.ToBeAddedProductsId == possiblePK).FirstOrDefault() != null)
            {
                possiblePK++;
            }
            return possiblePK;
        }

        [HttpGet]
        public void UpdatePK(){
            var table = this._context.ToBeAddedProducts.ToList();
        
            foreach (var item in table)
            {   
                var newEntity = new Product(){
                    productNaam = item.productNaam,
                    productUitgever = item.productUitgever,
                    productOmschr = item.productOmschr,
                    aantalInVooraad = item.aantalInVooraad,
                    productPrijs = item.productPrijs,
                    productType = item.productType,
                    productOntwikkelaar = item.productOntwikkelaar,
                    productImg = item.productImg,
                    productGenre = item.productGenre,
                    consoleType = "Playstation3"

                };
                this._context.Producten.Add(newEntity);
                this._context.SaveChanges(); 
                
            }
        }



        [HttpPost]
        public  void  PostNewEntitiesToDatabase(){           
            var client = new HttpClient(){BaseAddress= new Uri("https://api-2445582011268.apicast.io")};
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("user-key", "545ca34a4ad8dda86b8a95071ff6b5c4");
            client.DefaultRequestHeaders.TryAddWithoutValidation("user-key", "545ca34a4ad8dda86b8a95071ff6b5c4");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response =   client.GetAsync("/games/?fields=name,url,cover,summary,genres,publishers,developers&limit=50&offset=1650").Result;           
            var content =  response.Content.ReadAsStringAsync().Result;
      
            var randomPublishers = new string[]{"82","786", "104", "1053","248","1014","70","197","1769","1044","3010"};
            var randomDevelopers = new string[]{"603","786","1053","1218","393","2111","1934","563","782","828"};

            dynamic convertedJson = JsonConvert.DeserializeObject(content);
            foreach (var item in convertedJson)
            {
                var randomPublisherNumber = new Random().Next(0,randomPublishers.Count() - 1);
                var randomDeveloperNumber = new Random().Next(0,randomDevelopers.Count() - 1);
                
                if(item.name == "" ||  item.summary == "" || 
                item.genres == null || item.cover == null || item.summary == null || item.name == null){
                    continue;
                }
                else if(item.cover.url == null || item.cover.url == ""){
                    continue;
                }

                else{
                    var castUrlToString = (string) item.cover.url;
                    var urlConverted = castUrlToString.Replace("/t_thumb/", "/t_cover_big/");

                
                    var newEntity = new ToBeAddedProducts(){
                    ToBeAddedProductsId = this.GivePK(),
                    productNaam = item.name,
                    productUitgever = item.publishers == null? randomPublishers[randomPublisherNumber] : item.publishers[0],
                    productOmschr = item.summary,
                    aantalInVooraad = 0,
                    productPrijs = 0,
                    productOntwikkelaar = item.developers == null? randomDevelopers[randomDeveloperNumber] : item.developers[0],
                    productImg = "https:" + urlConverted, 
                    productGenre =  item.genres[0],
                    consoleType = "",
                    productType = null
                    
                };                
                this._context.ToBeAddedProducts.Add(newEntity);
                this._context.SaveChanges();     
                }                  
            }
        }
    }
}
