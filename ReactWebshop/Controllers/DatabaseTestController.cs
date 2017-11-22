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
            Admin foundEntity = this._context.Admins.Find(1);
            return Ok(foundEntity.achterNaam);
        }
    }
}