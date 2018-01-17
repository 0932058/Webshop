import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'ClientApp/components/User/User';
import 'bootstrap';
import { Redirect } from 'react-router';
import {Review} from "../Items/ItemsInterfaces";

interface ReviewPageState{
    reviews: any[];
    loaded: boolean;
}

export class ReviewsPage extends React.Component<{}, ReviewPageState>{
    constructor(){
        super();
        this.GetAllReviewsFromApi = this.GetAllReviewsFromApi.bind(this);
        this.DeleteComment = this.DeleteComment.bind(this);
        this.state = {reviews: [], loaded: false};
    }
    componentWillMount(){
        this.GetAllReviewsFromApi()
        .then(reviewsResult => this.setState({reviews: reviewsResult, loaded: true}))
        .catch(_ => alert("No reviews found!"))
        
    }
    async GetAllReviewsFromApi(): Promise<Review[]>{
        var result = await fetch("api/Admin/Reviews", {method: "GET"});
        var resultConverted = result.json();
        return resultConverted;
    }
    DeleteComment(reviewID: number){
        var result =  fetch("api/Review/Remove/" + reviewID, {method: "DELETE"});
        alert("Comment deleted");
        this.GetAllReviewsFromApi().then(reviewsResult => this.setState({reviews: reviewsResult}))

    }
    render(){
        return(
            <div className='col-md-8'>
           <div>
               {this.state.loaded? 
               this.state.reviews.map((review, index) => {
                   return(
                       <div>
                     <h2> Comment: {index + 1} </h2> 
                    <div><strong> Product: </strong>  {review.productNaam}</div>
                    <div><strong> Klant:  </strong>{review.klantNaam}</div>
                    <div><strong> Rating:  </strong>{review.rating}</div>
                    <div><strong> Comment:  </strong>{review.comment}</div>
                    <button className='btn btn-danger' onClick={() => this.DeleteComment(review.reviewId)}> <strong> Delete comment </strong> </button> 
                   </div>)
               })
               :
               <div> Loading... </div>
               }
            </div>

        </div>)
    }
}