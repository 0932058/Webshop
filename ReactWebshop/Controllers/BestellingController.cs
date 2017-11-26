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
        
            using (var db = new normieContext())
            var foundBestelling = db.Bestelling.Where(user => user.pk == id).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundBestelling);
            }
            else{
                return NotFound(foundBestelling);
            }
        }
        [HttpPost("Post")]
        public IActionResult Post(int product, int klant){
            using (var db = new normieContext())
            Bestelling bestelling = new Bestelling();
            bestelling.BestellingId = _context.Bestelling.Count() + 1;
            bestelling.productId = product;
            bestelling.klantId = klant;
            bestelling.bestellingDatum = DateTime.Now;
            bestelling.status = "In behandeling";
            
            db.Bestellingen.Add(bestelling);
            
            return View();
        }

        
    }
}
