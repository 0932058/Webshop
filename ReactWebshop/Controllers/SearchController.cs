using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace reactTwo.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly normieContext _context;

        public SearchController (normieContext context) {
            _context = context;
        }

        [HttpGet("[action]")]
        public void Get(string searchTerm)
        {
            // var foundProducts = _context.Producten.Where( p => p.productNaam == searchTerm);

            // return foundProducts;
        }

        [HttpPost("Post")]
        public void Post()
        {
            Product p = new Product{
                    ProductId = 42,
                    productNaam = "Pubg",
                    productUitgever = "Konami",
                    productOmschr = "nice game",
                    aantalInVooraad = 30,
                    productPrijs = 40.00m,
                    productType = "Game",
                    productOntwikkelaar = "Konami",
                    productImg = "nothing",
                    productGenre = "Battle royale",
                    consoleType = "PS4",
                };

            _context.Producten.Add(p);
            _context.SaveChanges();
        }

        /*
        //Shopping cart testing
        [HttpGet("{id}")]
        public IActionResult Get(int id){
            Game[] gamesList = new Game[10];
            for (int i = 0; i < gamesList.Count(); i++){  
                    gamesList[i] = new Game(i);
                }  
            for (int i = 0; i < gamesList.Count(); i++){  
                if(gamesList[i].id == id){
                     return Ok(gamesList[i]);
                }  
            }
            return NotFound();
        }*/
    }
}
