using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    //This is the default route of the API. 
    [Route("api/[controller]")]
    public class ShoppingCartController : Controller{
        public shoppingCart[] shoppingCart = new shoppingCart[1];
        public ShoppingCartController(){
            this.shoppingCart[0] = (new shoppingCart(1,1,"games",1));
        }
        // GET api/values
        [HttpGet("Get")]
        public IActionResult Get()
        {
            if(this.shoppingCart.Length > 0){
                return Ok(this.shoppingCart);
            }
            else{
                  return NotFound(this.shoppingCart);
            }      
        }

        // GET api/values/5
        [HttpGet("Get/{userPK}")]
        public IActionResult Get(int userPK)
        {
            var foundShoppingCart = shoppingCart.ToList().Where(shoppingCart => shoppingCart.accountFK == userPK);
            if(foundShoppingCart != null && foundShoppingCart.Count() > 0){
                return Ok(foundShoppingCart.ToArray());
            }
            else{
                return NotFound();
            }

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