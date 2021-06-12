import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private baseUrl = "http://localhost:3000/api";
  private reviewsUrl = this.baseUrl + "/reviews";

  constructor(private http: HttpClient) { }

  updateReview(parkingId: number, rating: number): Observable<any> {
    return this.http.post<Review>(this.reviewsUrl + "/add", {
      parkingId: Number(parkingId),
      rating: Number(rating)
    });
  }

  getUserReview(parkingId: number): Observable<ReviewResponse> {
    return this.http.get<ReviewResponse>(this.reviewsUrl + "/get/" + parkingId);
  }

  getAllReviews(parkingId: number): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(this.reviewsUrl + "/get-all/" + parkingId);
  }

}

export type ReviewResponse = {
  isPresent: boolean,
  review: Review
}

export type ReviewsResponse = {
  isPresent: boolean,
  reviews: Review[]
}

export type Review = {
  parkingId: number,
  userEmail: string,
  rating: number
}
