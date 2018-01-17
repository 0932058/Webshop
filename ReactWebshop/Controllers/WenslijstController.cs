using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;

namespace reactTwo.Controllers
{
    [Route("api/Wenslijsten")]
    public class WenslijstenController : Controller
    {
        private readonly normieContext _context;

        public WenslijstenController (normieContext context) {
            _context = context;
        }

        [HttpGet("Get/{KlantId}")]
        public IActionResult Get(int klantId){
            var foundOrder = this._context.Wenslijsten.Where(order => order.klantId  == klantId).ToArray();
            if(foundOrder != null){
                return Ok(foundOrder);

            }
            else{
                return NotFound(foundOrder);
            }
        }
        [HttpPost("Post")]
        public void Post([FromBody]Wenslijst list){
            var result = this._context.Wenslijsten.Where((w) => w.klantId == list.klantId && w.productNmr == list.productNmr).FirstOrDefault();
            if(result == null){
                this._context.Wenslijsten.Add(list);
                this._context.SaveChanges();
            }
        } 
        [HttpDelete("Delete")]
        public void Delete([FromBody]Wenslijst list){
            var itemToRemove = this._context.Wenslijsten.Where(item => (item.klantId == list.klantId && item.productNmr == list.productNmr)).FirstOrDefault();
            this._context.Wenslijsten.Remove(itemToRemove);
            this._context.SaveChanges();
        }
    }
}
