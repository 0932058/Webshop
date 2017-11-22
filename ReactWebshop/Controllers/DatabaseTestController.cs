using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;

namespace reactTwo.Controllers {

    [Route ("api/[controller]")]
    public class MoviesController : Controller {
        private readonly normieContext _context;

        public MoviesController (normieContext context) {
            _context = context;
        }

        // GET api/values
        [HttpGet("Get")]
        public IActionResult Get () {
            Product foundEntity = this._context.product.Find(1);
            if(foundEntity != null){
                return Ok(foundEntity.productNaam);
            }
            return Ok("API IS SEEN");
        }
    }
}