using System;
using System.Collections.Generic;
using System.Linq;

using Models;
using Microsoft.EntityFrameworkCore;


namespace StatisticsClasses{
    public static class OmzetLogic{
            public static dynamic CreateQuery(DatumFilter filter, DbSet<Bestelling> bestellingContext, DbSet<Product> productenContext){
            var result = bestellingContext;
            dynamic res = Enumerable.Empty<dynamic>().AsQueryable();

            if(filter.day != null){
                 if(result.Where(a => a.bestellingDatum.Day == filter.day.Value.Day &&
                 a.bestellingDatum.Month == filter.day.Value.Month && a.bestellingDatum.Year == filter.day.Value.Year).FirstOrDefault() == null){              

                }
                else{
                    res = result
                    .Where((a) => a.bestellingDatum.Year == filter.day.Value.Year && a.bestellingDatum.Month == filter.day.Value.Month &&
                    a.bestellingDatum.Day == filter.day.Value.Day)
                    .Join(productenContext, (b) => b.productId, (p) => p.ProductId, (bRes, pRes) => new {pRes.productNaam, pRes.productPrijs, bRes.bestellingDatum})
                    .GroupBy((a) => new {hour = a.bestellingDatum.Hour})
                    .Select((a) => new {x = a.Key.hour, y = a.Sum((z) => z.productPrijs)})
                    .OrderBy((a) => a.x)
                    .DateRange(24);      
                }       
            }
            else if(filter.month != null){
                if(result.Where(a => a.bestellingDatum.Month == filter.month.Value.Month && 
                 a.bestellingDatum.Year == filter.month.Value.Year).FirstOrDefault() == null){
                   
                }
                else{
                    res = result
                    .Where((a) => a.bestellingDatum.Year == filter.month.Value.Year && a.bestellingDatum.Month == filter.month.Value.Month)
                    .Join(productenContext, (b) => b.productId, (p) => p.ProductId, (bRes, pRes) => new {pRes.productNaam, pRes.productPrijs, bRes.bestellingDatum})
                    .GroupBy((a) => new {dag = a.bestellingDatum.Day})
                    .Select((a) => new {x = a.Key.dag, y = a.Sum((z) => z.productPrijs)})
                    .OrderBy((a) => a.x)
                    .DateRange(DateTime.DaysInMonth(filter.month.Value.Year, filter.month.Value.Month));
                }

            }
            else{
                 if(result.Where(a => a.bestellingDatum.Year == filter.year.Value.Year).FirstOrDefault() == null){
                }
                else{
                    res = result
                    .Where((a) => a.bestellingDatum.Year == filter.year.Value.Year)
                    .Join(productenContext, (b) => b.productId, (p) => p.ProductId, (bRes, pRes) => new {pRes.productNaam, pRes.productPrijs, bRes.bestellingDatum})
                    .GroupBy((a) => new {month = a.bestellingDatum.Month})
                    .Select((a) => new {x = a.Key.month, y = a.Sum((z) => z.productPrijs)})
                    .OrderBy((a) => a.x)
                    .DateRange(12);
                }
            }
            return res;           
        }     
    }
}