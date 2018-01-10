using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace Models 
{
    public class normieContext : DbContext {
        public DbSet<Wenslijst> Wenslijsten { get; set; }
        public DbSet<Klant> Klanten { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Bestelling> Bestellingen { get; set; }
        public DbSet<Betaling> Betalingen { get; set; }
        public DbSet<Product> Producten { get; set; }
        public DbSet<ToBeAddedProducts> ToBeAddedProducts{get;set;} //Will be removed after the 1000 entiteis are added

        public normieContext(DbContextOptions<normieContext> options)
            : base(options)
        {}
        
    }

    public class Wenslijst {
        public int wenslijstId { get; set; }
        public int productNmr { get; set; }
        public int klantId { get; set; }
}                          
    public class Klant {
        public int KlantId { get; set; }
        public string klantNaam { get; set; }
        public string klantAchternaam { get; set; }
        public string klantTussenvoegsel { get; set; }
        public int klantTel { get; set; }
        public string klantMail { get; set; }
        public string klantStraat { get; set; }
        public string klantPostcode { get; set; }
        public string klantStraatnmr { get; set; }
        public string username { get; set; }
        public string password { get; set; }
}
    public class Product {
        public int ProductId { get; set; }
        public string productNaam { get; set; }
        public string productUitgever { get; set; }
        public string productOmschr { get; set; }
        public int aantalInVooraad { get; set; }
        public decimal productPrijs { get; set; }
        public string  productType { get; set; }
        public string productOntwikkelaar { get; set; }
        public string productImg { get; set; }
        public string productGenre { get; set; }
        public string consoleType { get; set; }
    }

    public class Admin {
        public int AdminId { get; set; }       
        public string voorNaam { get; set;}
        public string achterNaam { get; set; }
        public string tussenVoegsel { get; set; } 
        public string mail { get; set; }
        public string functie { get; set; }
        public string username { get; set;}
        public string password { get; set;}
    }

    public class Bestelling {
        public int BestellingId { get; set; }
        public int productId { get; set; }
        public DateTime bestellingDatum { get; set; }
        public DateTime verstuurDatum { get; set; }
        public string status { get; set; }
        public int klantId { get; set; }
    }

    public class JoinedBestelling {
        public int BestellingId { get; set; }
        public Product productId { get; set; }
        public DateTime bestellingDatum { get; set; }
        public DateTime verstuurDatum { get; set; }
        public string status { get; set; }
        public int klantId { get; set; }
    }

    public class Betaling {
       
        public int BetalingId { get; set; }
        public DateTime betalingsDatum { get; set; }
        public decimal bedrag { get; set; }
    }
    //Will be removed when the 1000 entities are added
        public class ToBeAddedProducts {
        public int ToBeAddedProductsId { get; set; }
        public string productNaam { get; set; }
        public string productUitgever { get; set; }
        public string productOmschr { get; set; }
        public int aantalInVooraad { get; set; }
        public decimal productPrijs { get; set; }
        public string  productType { get; set; }
        public string productOntwikkelaar { get; set; }
        public string productImg { get; set; }
        public string productGenre { get; set; }
        public string consoleType { get; set; }
    }
}