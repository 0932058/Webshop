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

        [HttpGet("GetAll")]
        public IActionResult GetAll(){
            List<JoinedBestelling> bestToRet = new List<JoinedBestelling>();

            foreach(Bestelling bestelling in _context.Bestellingen.AsEnumerable()){
                JoinedBestelling newBest = new JoinedBestelling{
                    BestellingId = bestelling.BestellingId,
                    productId = _context.Producten.Find(bestelling.productId),
                    bestellingDatum = bestelling.bestellingDatum,
                    verstuurDatum = bestelling.verstuurDatum,
                    status = bestelling.status,
                    klantId = _context.Klanten.Find(bestelling.klantId)
                };
                bestToRet.Add(newBest);
            }

            if(bestToRet != null){
                return Ok( bestToRet);

            }
            else{
                return NotFound(bestToRet);
            }
        }

        [HttpGet("Get/{KlantId}")]
        public IActionResult Get(int KlantId){
            List<JoinedBestelling> bestToRet = new List<JoinedBestelling>();

            var foundOrder = this._context.Bestellingen.Where(order => order.klantId  == KlantId).ToArray();

            foreach(Bestelling bestelling in foundOrder){
                JoinedBestelling newBest = new JoinedBestelling{
                    BestellingId = bestelling.BestellingId,
                    productId = _context.Producten.Find(bestelling.productId),
                    bestellingDatum = bestelling.bestellingDatum,
                    verstuurDatum = bestelling.verstuurDatum,
                    status = bestelling.status,
                    klantId = _context.Klanten.Find(bestelling.klantId)
                };
                bestToRet.Add(newBest);
            }

            if(foundOrder != null){
                return Ok( bestToRet.ToArray());

            }
            else{
                return NotFound(foundOrder);
            }
        }

        [HttpPost("Post")]
        public void Post([FromBody]Bestelling[] orders){
            int counter = 1;
            foreach (Bestelling order in orders)
            {
                order.BestellingId = this._context.Bestellingen.Count() + counter;
                this._context.Bestellingen.Add(order);
                counter += 1;
            }
            this._context.SaveChanges();
        
        }
        [HttpPut]
        public void Put([FromBody] Bestelling order){
            var existingOrder = this._context.Bestellingen.Where((x) => x.BestellingId ==  order.BestellingId).FirstOrDefault();
            existingOrder.productId = order.productId;
            existingOrder.bestellingDatum = order.bestellingDatum;
            existingOrder.verstuurDatum = order.verstuurDatum;
            existingOrder.status = order.status;
            existingOrder.klantId = order.klantId;
            this._context.SaveChanges();
        }
        [HttpPost("Post/Mail/")]
         public void SendEmail([FromBody] KlantEnBestelling klantEnBestelling){
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            message.To.Add(new MailboxAddress(klantEnBestelling.klant.email));
            message.Subject = "Bestelling Normiewebshop";

            string productenNamen = "";
            foreach (var productBestelling in klantEnBestelling.bestellingen){
                productenNamen += productBestelling.name + " " + productBestelling.console + "\r\n";    
                                         
            }          
            message.Body = new TextPart("plain"){
                Text = String.Format(
                    "Bedankt voor uw bestelling!" +
                    "\r" +
                    "Uw ingevoerde gegevens: " +
                    "\r" +
                    "Voornaam: {0}" + 
                    "\r" + 
                    "Achternaam: {1}" + 
                    "\r" +
                    "Straatnaam: {2}" + 
                    "\r" +
                    "Postcode: {3}" + 
                    "\r" +
                    "bestellingen:" + 
                    "\r" +
                    productenNamen +
                    "\r" +
                    "Met vriendelijke groet" + 
                    "\r" +
                    "De normie shop", 
                    klantEnBestelling.klant.voornaam,
                    klantEnBestelling.klant.achternaam,
                    klantEnBestelling.klant.straatnaam,
                    klantEnBestelling.klant.postcode)                 
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
