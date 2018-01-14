using System;
using System.Collections.Generic;
using System.Linq;

using Models;
using Microsoft.EntityFrameworkCore;


namespace StatisticsClasses{
    public static class KlantRegistratieLogic{
        public static dynamic CreateQuery(DatumFilter filter, DbSet<Klant> context){
            var result = context;
            dynamic res = Enumerable.Empty<dynamic>().AsQueryable();

            if(filter.day != null){
                if(result.Where(a => a.klantRegistratieDatum.Day == filter.day.Value.Day &&
                a.klantRegistratieDatum.Month == filter.day.Value.Month && a.klantRegistratieDatum.Year == filter.day.Value.Year).FirstOrDefault() == null){              

                }
                else{
                    res = result.
                    Where(a => a.klantRegistratieDatum.Day == filter.day.Value.Day &&
                    a.klantRegistratieDatum.Month == filter.day.Value.Month && a.klantRegistratieDatum.Year == filter.day.Value.Year)
                        .GroupBy((a) => new {hour = a.klantRegistratieDatum.Hour})                    
                        .Select((a) => new {x = a.Key.hour, y = a.Count()})
                        .OrderBy((a) => a.x)
                        .DateRange(24);           
                }       
            }
            else if(filter.month != null){
                if(result.Where(a => a.klantRegistratieDatum.Month == filter.month.Value.Month && 
                a.klantRegistratieDatum.Year == filter.month.Value.Year).FirstOrDefault() == null){
                   
                }
                else{
                    res = result
                    .Where(a => a.klantRegistratieDatum.Month == filter.month.Value.Month && 
                    a.klantRegistratieDatum.Year == filter.month.Value.Year)
                    .GroupBy((a) => new {dag = a.klantRegistratieDatum.Day})
                    .Select((a) => new {x = a.Key.dag, y = a.Count()})
                    .OrderBy((a) => a.x)
                    .DateRange(DateTime.DaysInMonth(filter.month.Value.Year, filter.month.Value.Month));
                }

            }
            else{
                if(result.Where(a => a.klantRegistratieDatum.Year == filter.year.Value.Year).FirstOrDefault() == null){

                }
                else{
                    res = result
                    .Where(a => a.klantRegistratieDatum.Year == filter.year.Value.Year)
                    .GroupBy((a) => new {month = a.klantRegistratieDatum.Month})
                    .Select((a) => new {x = a.Key.month, y = a.Count()})
                    .OrderBy((a) => a.x)
                    .DateRange(12);
                }
            }
            return res;           
        }     
        public static IEnumerable<dynamic> DateRange(this IQueryable collection, int count){    
            bool found;  
            for (int i = 1; i <= count; i++){
                    found = false;
                    foreach (dynamic item in collection){ 
                        if(item.x == i){
                            found = true;
                            yield return item;
                        }                                                   
                    }  
                    if(!found){
                        yield return new{x = i, y = 0};
                    }               
                }
            }
    }
}
//Select plaats, count(plaats) From klanten Group By Plaats
//Select Date where data = NOW()
//Select date where WeekOfYear(date) = weekOfYear(now())
//Select date where Year(date) = Year(Now()) and Month(date) = Month(now())
//weekDay = day

//Self selection etc etc 
//select date where weekOfYear(date) = 52;