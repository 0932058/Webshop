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
        [HttpPost("Post/Mail/{klantEmail}")]
         public void SendEmail([FromBody] dynamic[] productBestellingen, string klantEmail){
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            
            message.To.Add(new MailboxAddress("0926477@hr.nl"));
            message.Subject = "Bestelling Normiewebshop";

            string productenNamen = "";
            foreach (var ProductBestelling in productBestellingen){
                productenNamen += ProductBestelling.name + " " + ProductBestelling.console + "\r\n";    
                                         
            }          
            message.Body = new TextPart("plain"){
                Text = String.Format(
                    "Bedankt voor uw bestelling bij de Normiewebshop!" +
                    "\r" +
                    "Dit zijn de bestellingen die u gemaakt hebt:" + 
                    "\r" +
                    productenNamen +
                    "\r" +
                    "Met vriendelijke groet" + 
                    "\r" +
                    "De normie shop"
                    )
            };
                    

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
