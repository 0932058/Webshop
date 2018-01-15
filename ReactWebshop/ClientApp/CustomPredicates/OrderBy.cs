using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;


//Used for the statistics part of the application
//This is an predicate (lambda) builder
namespace CustomPredicate{
    public class OrderBy {
        public int ascendOrDescend;
        public string attribute;
        public Func<T, T1> OrderByToPredicate<T, T1>(OrderBy f) {
            var parameter = Expression.Parameter(typeof(T), "paramater");
            var property = Expression.PropertyOrField(parameter, f.attribute);           
            var predicate = Expression.Lambda<Func<T, T1>>(property, parameter);
            return predicate.Compile();
        }
    }
}
