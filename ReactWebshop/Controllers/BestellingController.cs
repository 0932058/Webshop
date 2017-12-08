using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;

namespace reactTwo.Controllers
{
    [Route("api/Bestellingen")]
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
        public void Post([FromBody]Bestelling order){
            order.BestellingId = this._context.Bestellingen.Count() + 1;
            this._context.Bestellingen.Add(order);
            this._context.SaveChanges();
    }
}
}
