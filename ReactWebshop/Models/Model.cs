using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace Models 
{
    public class normieContext : DbContext {
        public DbSet<Wenslijst> Wenslijst { get; set; }
        public DbSet<Klant> Klant { get; set; }
        public DbSet<Werknemer> Werknemer { get; set; }
        public DbSet<Bestellingen> Bestellingen { get; set; }
        public DbSet<productType> productType { get; set; }
        public DbSet<detailsBestelling> detailsBestelling { get; set; }
        public DbSet<Betaling> Betaling { get; set; }
        public DbSet<Product> product { get; set; }

        public normieContext(DbContextOptions<normieContext> options)
            : base(options)
        {}
        
    }

    public class Wenslijst {
        public int WenslijstId { get; set; }
        public int productNmr { get; set; }
        public DateTime toevoegDatum { get; set;}
    
}                          
    public class Klant {
        public int KlantId { get; set; }
        public string klantNaam { get; set; }
        public string klantAchternaam { get; set; }
        public string klantTussenvoegsel { get; set; }
        public string klantTel { get; set; }
        public string klantMail { get; set; }
        public string klantStraat { get; set; }
        public string klantPostcode { get; set; }
        public string klantStraatnmr { get; set; }
}
    public class Product {
        public int ProductId { get; set; }
        public string productNaam { get; set; }
        public string productUitgeven { get; set; }
        public string productOmschr { get; set; }
        public int aantalInVooraad { get; set; }
        public decimal productPrijs { get; set; }
        public string  productType { get; set; }
        public string productOntwikkelaar { get; set; }
    }

    public class Werknemer {
        public int WerknemerId { get; set; }
        public string voorNaam { get; set;}
        public string achterNaam { get; set; }
        public string tussenVoegsel { get; set; } 
        public string mail { get; set; }
        public string functie { get; set; }
    }

    public class Bestellingen {
        public int BestellingenId { get; set; }
        public DateTime bestellingDatum { get; set; }
        public DateTime verstuurDatum { get; set; }
        public string status { get; set; }
        public string klantNmr { get; set; }
    }

    public class Betaling {
       
        public int BetalingId { get; set; }
        public string checkNmr { get; set; }
        public DateTime betalingsDatum { get; set; }
        public decimal bedrag { get; set; }
    }

    public class detailsBestelling {
        public int detailsBestellingId { get; set; }
        public string productCode { get; set; }
        public int bestellingAantal { get; set; }
        public decimal stukPrijs { get; set; }
    }

    public class productType {
        public int productTypeId {get;set;}
        public string Type { get; set; }
        public string omschrijving { get; set; }
        public string html { get; set; }
        public string image { get; set; }
    } 
}