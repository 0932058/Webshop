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
using StatisticsClasses;


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
                    var ammountOfBuysOrdered = productenEnBestellingenJoined.OrderBy(a => a.bResult.Count()).Select((a) => new {x = a.productNaam, y= a.bResult.Count()}).Take(10);
                    return Ok(ammountOfBuysOrdered.ToArray());
            }
            var ammountOfBuysDescendedOrdered = productenEnBestellingenJoined.OrderByDescending(a => a.bResult.Count()).Select((a) => new {x = a.productNaam, y = a.bResult.Count()}).Take(10);
            return Ok(ammountOfBuysDescendedOrdered.ToArray());        
        }
         [HttpPost("Reviews/{orderOrNot}")]
         public IActionResult ReviewsStatistics(int orderOrNot){  
           var averageRatingPerProduct = 
           from a in this._context.Review         
           group a by a.ProductId into Product       
           select new {
               ID = Product.Key,
               AvG = Product.Average((a) => a.Rating)
           };
           var joined = averageRatingPerProduct.Join(this._context.Producten, (r) => r.ID, (p) => p.ProductId, (rResult,pResult) => new {x =  pResult.productNaam, y = rResult.AvG});    
           if(orderOrNot == 0){
               return Ok(joined.OrderByDescending((a) => a.y).Take(10).ToArray());
           } 
            return Ok(joined.OrderBy((a) => a.y).Take(10).ToArray());       
         }
        [HttpPost("Reviews/Category")]
         public IActionResult ReviewsStatisticsByCategory(OrderBy property){  
             var AverageRatingPerCategory = this._context.Review.Join(this._context.Producten, (r) => r.ProductId, (p) => p.ProductId, (rResult,pResult) => 
             new {rating = rResult.Rating, category = pResult.productType})
             .GroupBy(a => new {category = a.category})
             .Select(a => new {key = a.Key.category, value = Math.Round(a.Average((r => r.rating)))});  
             if(property.ascendOrDescend == 0){
                 return Ok(AverageRatingPerCategory.OrderBy((a) => a.value));
             }
             return Ok(AverageRatingPerCategory.OrderByDescending((a) => a.value));
         }
        //.............................................................
        //New api methods
        [HttpGet("Klant/Location")]
        public IActionResult KlantLocation(){
            var lolz = this._context.Klanten;
            var query = this._context.Klanten
            .Where((a) => a.klantPlaats != null)
            .GroupBy((a) => new {Plaats = a.klantPlaats})
            .Select((a) => new {key = a.Key.Plaats, value = a.Count()});
            return Ok(query.ToArray());
        }    
        [HttpPost("Klant/Registratie")]
        public IActionResult KlantRegistratie([FromBody] DatumFilter filter){
            var res = KlantRegistratieLogic.CreateQuery(filter,this._context.Klanten);
            return Ok(res);         
        }      
        [HttpPost("Omzet")]
        public IActionResult Omzet([FromBody] DatumFilter filter){
            var res = OmzetLogic.CreateQuery(filter,this._context.Bestellingen, this._context.Producten);
            return Ok(res);         
        }      
        [HttpPost("Bestellingen")]
        public IActionResult Bestellingen([FromBody] DatumFilter filter){
            var res = BestellingenLogic.CreateQuery(filter,this._context.Bestellingen);
            return Ok(res);         
        }     
    }
}
