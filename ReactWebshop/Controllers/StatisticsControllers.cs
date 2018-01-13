using System;
using System.Collections.Generic;
using System.Linq;

using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;
using CustomPredicate;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Diagnostics;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;


namespace Controllers
{
    [Route("api/[controller]")]
    public class StatisticsController : Controller
    {
        private readonly normieContext _context;

        public StatisticsController (normieContext context) {
            _context = context;
        }
        [HttpPost("Users/GroupBy")]
        public IActionResult UserStatisticsGroupBy([FromBody] GroupBy property){   
            //TODO: make more generic    
            var groupByPredicate = property.GroupByToPredicate<Klant,string>(property);
            var groupByresult = this._context.Klanten.GroupBy(groupByPredicate).ToArray();
            return Ok(groupByresult);           
        }
        [HttpPost("Orders/OrderBy")]
        public IActionResult OrdersStatisticsOrderBy([FromBody] OrderBy property){   
            var productenEnBestellingenJoined = this._context.Producten
            .GroupJoin(this._context.Bestellingen,(p) => p.ProductId, (b) => b.productId,(pResult, bResult) => new {pResult.productNaam,bResult});
          
            if(property.ascendOrDescend == 1){                 
                    var ammountOfBuysOrdered = productenEnBestellingenJoined.OrderBy(a => a.bResult.Count()).Select((a) => new {x = a.productNaam, y = a.bResult.Count()}).Take(10);
                    return Ok(ammountOfBuysOrdered.ToArray());
            }
            var ammountOfBuysDescendedOrdered = productenEnBestellingenJoined.OrderByDescending(a => a.bResult.Count()).Select((a) => new {x = a.productNaam, y = a.bResult.Count()}).Take(10);
            return Ok(ammountOfBuysDescendedOrdered.ToArray());        
        }
         [HttpPost("Reviews")]
         public IActionResult ReviewsStatistics([FromBody] OrderBy property){  
            //  var productenEnReviewsJoined = this._context.Producten
            // //  .GroupJoin(this._context.Review, (p) => p.ProductId, (r) => r.ProductId, (pResult,rResult) => new {x = pResult.productNaam,  y = rResult});
             
   
            // //    if(property.ascendOrDescend == 1){
            // //     productenEnReviewsJoined.OrderBy((a) => a.y).ToArray();
            // }
            //var ammountOfReviewsDescended = productenEnReviewsJoined.OrderByDescending(a => a).ToArray();
            return NotFound();
         }

        [HttpPost("location")]
        public dynamic PostCodeToLocation([FromBody] string postCode){
            var client = new HttpClient(){BaseAddress= new Uri("http://json.api-postcode.nl")};
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("token", "cf25a726-d802-473c-881e-f8c761ff8ee1");
            client.DefaultRequestHeaders.TryAddWithoutValidation("token", "cf25a726-d802-473c-881e-f8c761ff8ee1");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response =   client.GetAsync("?postcode=" + postCode).Result;           
            var content =  response.Content.ReadAsStringAsync().Result;
            dynamic convertedJson = JsonConvert.DeserializeObject(content);
            if(convertedJson != null){
                return convertedJson.city;
            }
            else{
                return null;
            }
        }     
    }
}
