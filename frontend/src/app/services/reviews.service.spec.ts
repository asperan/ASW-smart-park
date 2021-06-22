import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Review, ReviewResponse, ReviewsResponse, ReviewsService } from './reviews.service';

const baseUrl = "http://localhost:3000/api";
const reviewsUrl = baseUrl + "/reviews";

describe('ReviewsService', () => {
  let httpTestingController: HttpTestingController;
  let service: ReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ReviewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#updateReview', () => {
    service.updateReview(1, 10).subscribe(res => {
      expect(res).toEqual({});
    });

    const testRequest = httpTestingController.expectOne(reviewsUrl + "/add");
 
    testRequest.flush({});
  });

  it('#getUserReview', () => {
    service.getUserReview(1).subscribe(res => {
      expect(res).toEqual(expctedReviewResponse);
    });

    const testRequest = httpTestingController.expectOne(reviewsUrl + "/get/" + "1");
 
    testRequest.flush(expctedReviewResponse);
  });

  it('#getAllReviews', () => {
    service.getAllReviews(1).subscribe(res => {
      expect(res).toEqual(expctedReviewsResponse);
    });

    const testRequest = httpTestingController.expectOne(reviewsUrl + "/get-all/" + "1");
 
    testRequest.flush(expctedReviewsResponse);
  });
});

const expectedReviews: Review[] = [
  {
      parkingId: 1,
      userEmail: "1234",
      rating: 7
  }, 
  {
      parkingId: 2,
      userEmail: "5678",
      rating: 5
  }
]

const expctedReviewResponse: ReviewResponse = {
  isPresent: true,
  review: expectedReviews[0]
}

const expctedReviewsResponse: ReviewsResponse = {
  isPresent: true,
  reviews: expectedReviews
}