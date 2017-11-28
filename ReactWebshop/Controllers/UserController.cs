using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{
    //This is the default route of the API. 
    [Route("api/[controller]")]
    public class UserController : Controller{
        private readonly normieContext _context;
        public UserController(normieContext context){
            this._context = context;
        }
        //public static List<user> users = new List<user>();  
        
        // GET api/values
        [HttpGet("Get")]
        public IActionResult Get(){
            return Ok(this._context.Klanten.ToArray());   
        }
        // GET api/values/5
        [HttpGet("Get/{id}")]
        public IActionResult Get(int id){
            var foundUser = this._context.Klanten.Where(user => user.KlantId  == id).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundUser);
            }
            else{
                return NotFound(foundUser);
            }
        }
        [HttpGet("Get/Username/{username}")]
        public IActionResult Get(string username){
            var foundUser = this._context.Klanten.Where(user => user.username == username).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundUser);
            }
            else{
                return NotFound(foundUser);
            }
        }
        // POST api/values
        [HttpPost("Post")]
        public void Post([FromBody]Klant user){
            user.KlantId = this._context.Klanten.Count() + 1;
            this._context.Klanten.Add(user);
            this._context.SaveChanges();
           
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Klant user){
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
