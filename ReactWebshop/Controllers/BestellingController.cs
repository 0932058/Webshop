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

        [HttpGet("Get/{id"})]
        public IActionResult Get(int id){
           var foundBestelling = _context.Bestelling.Where(user => user.pk == id).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundBestelling);
            }
            else{
                return NotFound(foundBestelling);
            }
        }
        [HttpPost("Post")]
        public IActionResult Post(int product, int klant){
            
            Bestelling bestelling = new Bestelling();
            bestelling.BestellingId = ID;
            bestelling.productId = product;
            bestelling.klantId = klant;
            bestelling.bestellingDatum = DateTime.Now;
            bestelling.status = "In behandeling";
            
            this._context.Bestellingen.Add(bestelling);
            
            return View();
        }

        
    }
}
