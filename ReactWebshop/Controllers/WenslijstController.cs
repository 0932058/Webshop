using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;

namespace reactTwo.Controllers
{
    [Route("api/Wenslijst")]
    public class WenslijstenController : Controller
    {
        private readonly normieContext _context;

        public WenslijstenController (normieContext context) {
            _context = context;
        }

        [HttpGet("Get/{KlantId}")]
        public IActionResult Get(int KlantId){
            var foundOrder = this._context.Wenslijsten.Where(order => order.klantId  == KlantId).ToArray();
            if(foundOrder != null){
                return Ok(foundOrder);

            }
            else{
                return NotFound(foundOrder);
            }
        }
        [HttpPost("Post")]
        public void Post([FromBody]WenslijstItem item){
            item.wenslijstId = this._context.Wenslijsten.Count() + 1;
            this._context.Wenslijsten.Add(item);
            this._context.SaveChanges();
        }/* 
        [HttpDelete("Delete/{KlantId}")]
        public void Delete(int KlantId){
            var foundList = this._context.Wenslijsten.Where(order => order.klantId  == KlantId).Cast<Models.Wenslijst>();
            if(foundList != null){
                this._context.Wenslijsten.Remove(foundList);
            }
        }
        */
    }
}
