using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controllers{
    public class user{
        public int pk;
        public string firstName;
        public string lastName;
        public string email;
        public string username;
        public string password;
        public int wishListFK;
        public int shoppingCartFK;
        public int orderFK;
        public string streetname;
        public string postcode;
        public string klantPlaats;
        public user(int pk, string firstName, string lastName, string email, string username, string password, 
        int wishListFK, int shoppingCartFK, int orderFK, string streetname, string postcode, string klantPlaats){
            this.pk = pk;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.username = username;
            this.password = password;
            this.wishListFK = wishListFK;
            this.shoppingCartFK = shoppingCartFK;
            this.orderFK = orderFK;
            this.streetname = streetname;
            this.postcode = postcode;
            this.klantPlaats = klantPlaats;
        }
    }
}