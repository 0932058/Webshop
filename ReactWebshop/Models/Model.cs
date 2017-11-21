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
        public int productNmr { get; set; }
        //public DateTime toevoegDatum
}                          


}