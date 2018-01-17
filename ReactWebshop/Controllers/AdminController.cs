using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller{
        private readonly normieContext _context;

        public AdminController(normieContext context){
            this._context = context;
        }
        //For login
        [HttpGet("{username}/{password}")]
        public dynamic GetAdmin(string username, string password){
            var possibleAdmin = this._context.Admins.Where((admin => admin.username == username)).Select((a) => new {a.username, a.password}).FirstOrDefault();
            return possibleAdmin;
        }
                // Get all the products
        [HttpGet("GetAllProducts")]
        public Product[] GetAllProducts(){
            return _context.Producten.ToArray();
        }
        // Get all the users
        [HttpGet("GetUser/{searchQuery}")]
        public IActionResult GetSpecificUser(string searchQuery){
            
            var users = this._context.Klanten.Where((a) => a.klantNaam.Contains(searchQuery) || a.username.Contains(searchQuery));
            if(users.FirstOrDefault() == null){
                return NotFound();
            }
            return Ok(users.ToArray());
        }

        // Get all the users
        [HttpGet("GetAllUsers")]
        public Klant[] GetAllUsers(){
            return _context.Klanten.OrderBy((a) => a.KlantId).ToArray();
        }

        // Get all the order
        [HttpGet("GetAllOrders")]
        public Bestelling[] GetAllOrderrs(){
            return _context.Bestellingen.ToArray();
        }

        // POST api/values
        [HttpPost("Post")]
        public void Post([FromBody]Klant user){
            user.KlantId = this._context.Klanten.Count() + 1;
            this._context.Klanten.Add(user);
            this._context.SaveChanges();
            this.SendEmail(user);
        }


        public void SendEmail(Klant user){
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            message.To.Add(new MailboxAddress(user.klantMail));
            message.Subject = "Registratie Normiewebshop";
            message.Body = new TextPart("plain"){
                Text = String.Format(
                    "Welkom {0}, bij de Normiewebshop!\r" +
                    "\r" +
                    "Je logingegevens:\r" +
                    "Gebruikersnaam: {1}\r" +
                    "Wachtwoord: {2}\r" +
                    "\r" +
                    "Met vriendelijke groeten,\r" +
                    "Normiewebshop",user.klantNaam,user.username, user.password)
                };

            using (var client = new SmtpClient()){
                client.Connect("mail.stefanpesic.nl", 465, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate("normiewebshop@stefanpesic.nl", "normieshopdude!");
                client.Send(message);
                client.Disconnect(true);             
            }
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Klant user){
        }
        [HttpGet("Reviews")]
        public IActionResult GetAllReviews(){
            if(this._context.Review.Count() <= 0){
                return NotFound();
            }
            
            var ReviewProductenJoined = this._context.Review.Join(this._context.Producten, (r) => r.ProductId, (p) => p.ProductId, (rRes, pRes) => new {
                reviewId = rRes.ReviewId,
                klantId = rRes.KlantId,
                productNaam =  pRes.productNaam,
                rating = rRes.Rating,
                comment = rRes.Comment              
            })
            .Join(this._context.Klanten, (r) => r.klantId, (k) => k.KlantId, (rRes, kRes) => new {
                reviewId = rRes.reviewId,
                klantNaam = kRes.klantNaam,
                productNaam =  rRes.productNaam,
                rating = rRes.rating,
                comment = rRes.comment   

            });
            return Ok(ReviewProductenJoined.ToArray());
        }
    }
}
