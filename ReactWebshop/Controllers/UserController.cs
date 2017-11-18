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
        public user[] users = new user[1];
        public UserController(){
            this.users[0] = (new user(1,"jan", "wil", "@live", "jan", "lol", 1,1,1,"lolstreet 10", "lool AB"));
        }
        // GET api/values
        [HttpGet("Get")]
        public user[] Get()
        {
            return this.users;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}