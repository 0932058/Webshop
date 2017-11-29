using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;

namespace reactTwo.Controllers
{
    [Route("api/Bestelling")]
    public class BestellingenController : Controller
    {
        private readonly normieContext _context;

        public BestellingenController (normieContext context) {
            _context = context;
        }

        [HttpGet("Get/{KlantId}")]
        public IActionResult Get(int KlantId){
            var foundOrder = this._context.Bestellingen.Where(order => order.klantId  == KlantId).ToArray();
            if(foundOrder != null){
                return Ok(foundOrder);

            }
            else{
                return NotFound(foundOrder);
            }
        }
        [HttpPost("Post")]
        public void Post([FromBody]dynamic info){
            Bestelling Order = new Bestelling();
            Order.bestellingDatum = DateTime.Now;
            Order.BestellingId = this._context.Bestellingen.Count()+1;
            Order.productId = info.product;
            Order.klantId = info.klant;
            Order.status = "In behandeling";
            this._context.Bestellingen.Add(Order);
            this._context.SaveChanges();
        }

        
    }
}
