using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;


//Used for the statistics part of the application
//This is an predicate (lambda) builder
namespace CustomPredicate{
    public class GroupBy {
        public string attribute { get; set; }
        private dynamic currentPropertyValue {get;set;}
        public Func<T, T1> GroupByToPredicate<T, T1>(GroupBy g) {
            var parameter = Expression.Parameter(typeof(T), "paramater");
            var property = Expression.PropertyOrField(parameter, g.attribute);
            this.currentPropertyValue = property;
            var predicate = Expression.Lambda<Func<T, T1>>(property, parameter);
            return predicate.Compile();
        }
        public MemberExpression GetCurrentPropertyValue(){
            return this.currentPropertyValue;

        }
    }
}
