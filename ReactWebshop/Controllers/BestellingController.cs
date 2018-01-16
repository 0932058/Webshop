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
                if (bestelling.productId != 0){
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
            }

            if(bestToRet != null){
                return Ok( bestToRet.ToArray());

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
                if ((bestelling.productId != 0) && (bestelling.klantId != 0)){
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
            int possiblePK = 1;
            foreach (Bestelling order in orders)
            {
                while(this._context.Bestellingen.Where((a) => a.BestellingId == possiblePK).FirstOrDefault() != null){
                    possiblePK++;
                }
                order.BestellingId = possiblePK;
                this._context.Bestellingen.Add(order);     
                this._context.SaveChanges();          
            }        
        }
        [HttpPost("Update")]
        public IActionResult UpdateOrder([FromBody] Bestelling order){
            this.DeleteOrder(order);
            this._context.Add(order);
            this._context.SaveChanges();
            return Ok(order);
        }

        private void DeleteOrder(Bestelling order){
            var orderToRemove = this._context.Bestellingen.Where((b) => b.BestellingId == order.BestellingId).FirstOrDefault();
            this._context.Bestellingen.Remove(orderToRemove);
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
        [HttpPost("Post/DeliveryMail/")]
        public void SendDeliveryEmail([FromBody]Bestelling order){
            var message = new MimeMessage();
            var klant = _context.Klanten.Where( (x) => x.KlantId == order.klantId).FirstOrDefault();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            message.To.Add(new MailboxAddress(klant.klantMail));
            message.Subject = "Bestelling Normiewebshop Onderweg";
            var adress = klant.klantStraat + " " + klant.klantStraatnmr + " in " + klant.klantPlaats;

            var product = _context.Producten.Where((x) => x.ProductId == order.productId).FirstOrDefault();
            message.Body = new TextPart("plain"){
                Text = String.Format(
                    "Uw bestelling van " +  product.productNaam + " is zojuist verzonden naar: {0}" +
                    "\r" +
                    "Met vriendelijke groet" + 
                    "\r" +
                    "De normie shop",
                    adress
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
