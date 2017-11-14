using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using lesson3.Models;
using Microsoft.AspNetCore.Mvc;

namespace controller {

    [Route ("api/lolz")]
    public class MoviesController : Controller {
        private readonly MovieDBContext _context;

        public MoviesController (MovieDBContext context) {
            _context = context;
            
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Movies> Get () {
            
            return _context.Movies.ToList ();;
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public IActionResult Get (int id) {
            var movie = _context.Movies.FirstOrDefault (t => t.MovieId == id);
            if (movie == null) {
                return NotFound ();
            }
            return new ObjectResult (movie);
        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] Movies value) { }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] Movies value) { }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}