using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;



namespace Controllers{
        public class shoppingCart{
        public int pk;
        public int accountFK;
        public string productForeignKeyReference;
        public int productFK;
        public shoppingCart(int pk, int accountFK, string productForeignKeyReference, int productFK){
            this.pk = pk;
            this.accountFK = accountFK;
            this.productForeignKeyReference = productForeignKeyReference;
            this.productFK = productFK;
        }
    }
}
