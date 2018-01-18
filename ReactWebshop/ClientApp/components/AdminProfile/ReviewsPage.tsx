import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from 'ClientApp/components/User/User';
import 'bootstrap';
import { Redirect } from 'react-router';
import {Review} from "../Items/ItemsInterfaces";

interface ReviewPageState{
    reviews: any[];
    filteredReviews: any[];
    loaded: boolean;
    search : string
}

export class ReviewsPage extends React.Component<{}, ReviewPageState>{
    constructor(){
        super();
        this.GetAllReviewsFromApi = this.GetAllReviewsFromApi.bind(this);
        this.DeleteComment = this.DeleteComment.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.resetSearch = this.resetSearch.bind(this);

        this.state = {
            reviews: [], 
            filteredReviews : [],
            loaded: false,
            search : "",
        };
    }
    componentWillMount(){
        this.GetAllReviewsFromApi()
        .then(reviewsResult => this.setState({reviews: reviewsResult, filteredReviews: reviewsResult,loaded: true}))
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
        this.GetAllReviewsFromApi().then(reviewsResult => this.setState({reviews: reviewsResult, filteredReviews: reviewsResult}))

    }

    resetSearch(){
        this.setState({
            filteredReviews : this.state.reviews,
            search : ""
        })
    }

    onSearchChange(event){
        let newReviews = [];

        for(let r of this.state.reviews){
            if(
                r.comment.toLowerCase().includes(event.target.value) ||
                r.klantNaam.toLowerCase().includes(event.target.value)
            ){
                console.log("pushing new review")
                newReviews.push(r);
            }
        }

        this.setState({
            search : this.state.search + event.target.value,
            filteredReviews : newReviews
        })
    }

    render(){
        return(
            <div className='col-md-8'>
           <div>
               <button className={"btn btn-danger"} onClick={this.resetSearch}>verwijder zoekterm</button>
               <input onChange={this.onSearchChange} placeholder={"zoek naar comments"} value={this.state.search}></input>

               {this.state.loaded? 
               this.state.filteredReviews.map((review, index) => {
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