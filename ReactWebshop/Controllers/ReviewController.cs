using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace Controllers
{
    [Route("api/[controller]")]
    public class ReviewController : Controller{
        private readonly normieContext _context;
        public ReviewController(normieContext context){
            this._context = context;
        }
        //Posts a review 
        [HttpPost("Post")]
        public void Post([FromBody]Review review){
            int possiblePK = 1;
            while(this._context.Review.Find(possiblePK) != null){
                possiblePK += 1;
            }
            review.ReviewId = possiblePK;
            this._context.Review.Add(review);
            this._context.SaveChanges();
        }              
        //Average review for an product
        [HttpGet("Get/{productId}")]
        public IActionResult Get(int productId){
            var averageReview = this._context.Review
            .Where((review => review.ProductId == productId));    
            if(averageReview.Count() <= 0){
                return NotFound(0);
            }
            else{
                var averageReviewCalculated = this._context.Review
                .Where((review => review.ProductId == productId))
                .GroupBy((a) => new {Review = a.ProductId})
                .Select((a) => a.Average((z) => z.Rating));
            
                 return Ok(averageReviewCalculated);
            }
        }
        //Get review comments
        [HttpGet("Get/Comment/{productId}")]
        public IActionResult GetComment(int productId){
            var comments = this._context.Review.
            Where(r => r.ProductId == productId)
            .Join(this._context.Klanten, review => review.KlantId, klant => klant.KlantId,(r,k) => new {k.klantNaam, k.KlantId, r.Rating,r.Comment});      
            return Ok(comments);
        }
        //Checks if user has already commented
        [HttpGet("Get/User/{userId}/{productId}")]
        public IActionResult GetUser(int userId, int productId){
            var user = this._context.Review.Where((r) => r.KlantId == userId && r.ProductId == productId).FirstOrDefault();
            if(user == null){
                return Ok(user);
            }
            return Ok(user);
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Klant user){
        }

        [HttpGet("GetAllReviews")]
        public Review[] GetAllReviews(){
            
            return _context.Review.ToArray();
        }
        // DELETE api/values/5
        [HttpDelete("Remove/{id}")]
        public void DeleteReview(int id){
            var reviewToRemove = this._context.Review.Find(id);
            this._context.Review.Remove(reviewToRemove);
            this._context.SaveChanges();
            
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id){
            var klantRemove = this._context.Klanten.Find(id);
            this._context.Klanten.Remove(klantRemove);
            this._context.SaveChanges();
    
        }
    }
}
