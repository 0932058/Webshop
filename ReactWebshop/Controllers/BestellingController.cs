using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Models;
using Microsoft.AspNetCore.Mvc;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace reactTwo.Controllers
{
    [Route("api/Bestellingen")]
    public class BestellingenController : Controller
    {
        private readonly normieContext _context;

        public BestellingenController (normieContext context) {
            _context = context;
        }

        [HttpGet("Get/{KlantId}")]
        public IActionResult Get(int KlantId){
            var foundOrder = this._context.Bestellingen.Where(order => order.klantId  == KlantId).ToArray();
            if(foundOrder != null){
                return Ok(foundOrder);

            }
            else{
                return NotFound(foundOrder);
            }
        }
        [HttpPost("Post")]
        public void Post([FromBody]Bestelling order){
            order.BestellingId = this._context.Bestellingen.Count() + 1;
            this._context.Bestellingen.Add(order);
            this._context.SaveChanges();
        
        }
        [HttpPost("Post/Mail")]
         public void SendEmail(List<Bestelling> bestellingen, string klantEmail){
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            message.To.Add(new MailboxAddress(klantEmail));
            message.Subject = "Bestelling Normiewebshop";

            var productNamen = this._context.Producten.Join(bestellingen, p => p.ProductId, b => b.productId, (p,b) => p.productNaam
            

            message.Body = new TextPart("plain"){
                Text = String.Format(
                    "Bedankt voor uw bestelling bij de Normiewebshop!\r" +
                    "\r" +
                    "Dit zijn de bestellingen die jij gemaakt hebt:\r") 



            using (var client = new SmtpClient()){
                client.Connect("mail.stefanpesic.nl", 465, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate("normiewebshop@stefanpesic.nl", "normieshopdude!");
                client.Send(message);
                client.Disconnect(true);             
            }
        }
    }
}
