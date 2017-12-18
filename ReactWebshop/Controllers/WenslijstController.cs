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
        public void Post([FromBody]Wenslijst item){
            item.wenslijstId = this._context.Wenslijsten.Count() + 1;
            var checkOrder = this._context.Wenslijsten.Where(order => (order.klantId == item.klantId && order.productNmr == item.productNmr)).ToArray();
            if (checkOrder == null){
                this._context.Wenslijsten.Add(item);
                this._context.SaveChanges();
                }
            
            
        } 
        [HttpDelete("Delete")]
        public void Delete([FromBody]Wenslijst list){
            var itemsToRemove = this._context.Wenslijsten.Where(item => (item.klantId == list.klantId && item.productNmr == list.productNmr));
            this._context.Wenslijsten.RemoveRange(itemsToRemove);
            this._context.SaveChanges();
        }
    }
}
