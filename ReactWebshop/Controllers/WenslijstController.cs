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
            this._context.Wenslijsten.Add(item);
            this._context.SaveChanges();
        } 
        [HttpDelete("Delete/{wenslijstId}")]
        public void Delete(int wenslijstId){
            var foundList = this._context.Wenslijsten.Where(order => order.wenslijstId  == wenslijstId) as Models.Wenslijst;
            this._context.Wenslijsten.Remove(foundList);
            this._context.SaveChanges();
        }
    }
}
