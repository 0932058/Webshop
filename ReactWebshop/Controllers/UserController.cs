using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    //This is the default route of the API. 
    [Route("api/[controller]")]
    public class UserController : Controller{
        public static List<user> users = new List<user>();  
        
        // GET api/values
        [HttpGet("Get")]
        public IActionResult Get(){
            return Ok(users.ToArray());
        }
        // GET api/values/5
        [HttpGet("Get/{id}")]
        public IActionResult Get(int id){
            var foundUser = users.Where(user => user.pk == id).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundUser);
            }
            else{
                return NotFound(foundUser);
            }
        }
        [HttpGet("Get/Username/{username}")]
        public IActionResult Get(string username){
            var foundUser = users.Where(user => user.username == username).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundUser);
            }
            else{
                return NotFound(foundUser);
            }
        }
        // POST api/values
        [HttpPost("Post")]
        public void Post([FromBody]user user){
            user.pk = users.Count() + 1;
            users.Add(user);
           
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]user user){
            users.Add(user);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        //Method will be removed when database is added
        public void NonControllerMethodAddDataToUserList(){
            users.Add(new user(1,"jan", "lol", "lol@live.nl", "a","a",1,1,1,"lolstreet","lool"));
        }
    }
}
