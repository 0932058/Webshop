using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace reactTwo.Controllers
{
    [Route("api/Items/")]
    public class ItemsController : Controller
    {
        private readonly normieContext _context;

        private Product[] rightItems ( Func<Product, bool> pred) {
            List<Product> rightProducts = new List<Product>();

            IEnumerable<Product> productList = _context.Producten.AsEnumerable();

            foreach(Product product in productList){
                if ( pred(product) ) {
                    rightProducts.Add(product);
                }
            };

            return rightProducts.ToArray();
        }

        public ItemsController (normieContext context) {
            _context = context;
        }

        [HttpGet("[action]")]
        public Product[] Home()
        {
            return this.rightItems( Product => true);
        }

        [HttpGet("[action]/{cat}")]
        public Product[] Games(string cat)
        {
            if(cat == "All"){
                return this.rightItems( Product => Product.productType == "Game");
            }
            return this.rightItems( Product => Product.productGenre.Contains(cat) && Product.productType == "Game");
        }

        [HttpGet("[action]/{cat}")]
        public Product[] Accessoires(string cat)
        {
            if(cat == "All"){
                return this.rightItems( Product => Product.productType == "Accessoire");
            }
            return this.rightItems( Product => Product.productGenre.Contains(cat) && Product.productType == "Accessoire");
        }

        [HttpGet("[action]/{cat}")]
        public Product[] Consoles(string cat)
        {
            if(cat == "All"){
                return this.rightItems( Product => Product.productType == "Console");
            }
            return this.rightItems( Product => Product.consoleType.Contains(cat) && Product.productType == "Console");
        }

        //Shopping cart testing
        [HttpGet("[action]")]
        public int[] GetAllId(){

            Product[] PList = this.rightItems( Product => true);

            List<int> idList = new List<int>();

            foreach( Product p in PList ){
                idList.Add(p.ProductId);
            }

            return idList.ToArray();
        }

        [HttpGet("[action]/{searchTerm}")]
        public Product[] Search(string searchTerm)
        {
            return this.rightItems( p => 
                p.productNaam.ToLower().Contains(searchTerm.ToLower())          || 

                p.productType.ToLower().Contains(searchTerm.ToLower())          ||

                p.productGenre.ToLower().Contains(searchTerm.ToLower())         ||

                p.productOntwikkelaar.ToLower().Contains(searchTerm.ToLower())  ||

                p.productUitgever.ToLower().Contains(searchTerm.ToLower())      ||

                p.consoleType.ToLower().Contains(searchTerm.ToLower())          ||

                p.consoleType.ToLower().Contains(searchTerm.Trim().ToLower())
            );
        }

        //Shopping cart testing
        [HttpGet("[action]/{id}")]
        public Product[] Item(int id){

            Product foundProduct = _context.Producten.Find(id);

            if(false){
                foundProduct = new Product{
                    productNaam = "product does not exist",
                    productUitgever = "product does not exist",
                    productOmschr = "product does not exist",
                    aantalInVooraad = 25,
                    productPrijs = 60.00m,
                    productType = "product does not exist",
                    productOntwikkelaar = "product does not exist",
                    productImg = "product does not exist",
                    productGenre = "product does not exist",
                    consoleType = "product does not exist",
                };
            }

            List<Product> SingleProductList = new List<Product>();
            
            SingleProductList.Add(foundProduct);

            return SingleProductList.ToArray();
        }

        //Shopping cart testing
        [HttpPost("Post")]
        public void Post()
        {
            MailMessage mail = new MailMessage();
            SmtpClient client = new SmtpClient();  

            client.Port = 587;
            client.EnableSsl = true;
            client.Credentials = new System.Net.NetworkCredential("Dymos078", "superguy1");
            client.Host = "smtp.gmail.com";

            mail.To.Add("blablablie5@live.com");
            mail.From = new MailAddress("normiesproject@gmail.com");
            mail.Subject = "this is a test email.";
            mail.Body = "this is my test email body";

            client.Send(mail);
        }


        [HttpPost("Change")]
        public void Change()
        {
            foreach(Product p in _context.Producten){
                if(p.productType == "Accessoire"       &&
                p.productGenre == "Koptelefoon"){
                    p.productGenre = "Headset";
                }
            }
            
            _context.SaveChanges();
        }
    }
}