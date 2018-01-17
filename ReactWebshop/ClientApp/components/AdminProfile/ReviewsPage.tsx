import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'ClientApp/components/User/User';
import 'bootstrap';
import { Redirect } from 'react-router';
import {Review} from "../Items/ItemsInterfaces";

interface ReviewPageState{
    reviews: Review[];
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
        .then(reviewsResult => this.setState({reviews: reviewsResult, loaded: true}));
    }
    async GetAllReviewsFromApi(): Promise<Review[]>{
        var result = await fetch("api/Review/GetAllReviews", {method: "GET"});
        var resultConverted = result.json();
        return resultConverted;
    }
    DeleteComment(reviewID: number){
        var result =  fetch("api/Review/Remove/" + reviewID, {method: "DELETE"});
        alert("Comment deleted");
        this.setState({loaded: false})
        this.GetAllReviewsFromApi();

    }
    render(){
        return(
           <div>
               {this.state.loaded? 
               this.state.reviews.map((review, index) => {
                   return([
                    <div> <h2> Comment: {index + 1} </h2> </div>,
                    <div><strong> Product: </strong>  {review.productId}</div>,
                    <div><strong> Klant:  </strong>{review.klantId}</div>,
                    <div><strong> Rating:  </strong>{review.rating}</div>,
                    <div><strong> Comment:  </strong>{review.comment}</div>,
                    <button onClick={() => this.DeleteComment(review.reviewId)}> <strong> Delete comment </strong> </button> 
                   ])
               })
               :
               <div> Loading... </div>
               }
            </div>

        )
    }
}