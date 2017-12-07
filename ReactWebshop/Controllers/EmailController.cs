using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
//using System.Net.Mail;
//using System.Net;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace Controllers
{
    //This is the default route of the API. 
    [Route("api/[controller]")]
    public class EmailController : Controller{
        private readonly normieContext _context;
        public EmailController(normieContext context){
            this._context = context;
        }
        [HttpGet("Get")]
        public IActionResult Get(){
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            message.To.Add(new MailboxAddress("0926477@hr.nl"));
            message.Subject = "Registratie Normiewebshop";
            message.Body = new TextPart("plain"){
                Text = "Welkom Stefan\r" +
                
                "We zijn blij met je aankoop, bij vragen horen we wat van je terug\r"};

             

            using (var client = new SmtpClient()){
                client.Connect("mail.stefanpesic.nl", 465, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate("normiewebshop@stefanpesic.nl", "normieshopdude!");
                client.Send(message);
                client.Disconnect(true);             
            }
            return Ok("LOL");
        }
    }
}
                

                