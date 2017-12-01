using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace reactTwo.Controllers
{
    [Route("api/Items")]
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
            return this.rightItems( Product => Product.productGenre == cat && Product.productType == "Games");
        }

        [HttpGet("[action]/{cat}")]
        public Product[] Accessoires(string cat)
        {
            return this.rightItems( Product => Product.productGenre == cat && Product.productType == "Accessoires");
        }

        [HttpGet("[action]/{cat}")]
        public Product[] Consoles(string cat)
        {
            return this.rightItems( Product => Product.productGenre == cat && Product.productType == "Consoles");
        }

        //Shopping cart testing
        [HttpGet("[action]/{id}")]
        public Product[] Get(int id){

            Product[] rightItemInDB = this.rightItems( Product => Product.ProductId == id);

            return rightItemInDB;
        }
    }
}