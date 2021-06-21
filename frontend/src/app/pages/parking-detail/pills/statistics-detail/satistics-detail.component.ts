import { Component, Input, OnInit } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { Review, ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-statistics-detail',
  templateUrl: './statistics-detail.component.html',
  styleUrls: ['./statistics-detail.component.css']
})
export class SatisticsDetailComponent implements OnInit {

  @Input() parkingId: number | undefined;

  userReview: Review | undefined;
  reviews: Review[] = [];

  userRating: number = 0;
  userStars: number[] = [];

  averageRating: number = 0;
  stars: number[] = [];
  isHalfStarPresent: boolean = false;

  faStar = faStar;
  faStarHalf = faStarHalf;
  faStarEmpty = faStarEmpty;

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.updateReviews();
  }

  private updateReviews() {
    this.resetReviews();
    if (this.parkingId) {
      this.reviewsService.getUserReview(this.parkingId).subscribe(res => {
        if (res.isPresent) {
          this.userReview = res.review;
          this.userRating = res.review.rating / 2;
          this.calculateUserStars();
        } else {
          this.userRating = 0;
          this.setUserStartsNoReview();
        }
      });
      this.reviewsService.getAllReviews(this.parkingId).subscribe(res => {
        if (res.isPresent) {
          this.reviews = res.reviews;
          this.calculateStars();
        } else {
          this.averageRating = 0;
        }
      });
    }
  }

  private resetReviews() {
    this.userReview = undefined;
    this.reviews = [];
    this.userRating = 0;
    this.userStars = [];
    this.averageRating = 0;
    this.stars = [];
    this.isHalfStarPresent = false;
  }

  private calculateStars() {
    if (this.reviews.length > 0) {
      let accumulator = 0;
      this.reviews.forEach(review => {
        accumulator += review.rating;
      })
      this.averageRating = accumulator / this.reviews.length / 2;
      const wholeStarsNum = Math.trunc(this.averageRating);
      this.isHalfStarPresent = this.averageRating % 5 >= 0.5 ? true : false;
      for (let i = 0; i < wholeStarsNum; i++) {
        this.stars.push(1);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        this.stars.push(0);
      }
    }
  }

  private calculateUserStars() {
    const wholeStarsNum = Math.trunc(this.userRating);
    for (let i = 0; i < wholeStarsNum; i++) {
      this.userStars.push(1);
    }
    for (let i = 0; i < 5 - wholeStarsNum; i++) {
      this.userStars.push(0);
    }
  }

  private setUserStartsNoReview() {
    for (let i = 0; i < 5; i++) {
      this.userStars.push(0);
    }
  }

  updateReview(index: number) {
    if (this.parkingId) {
      this.reviewsService.updateReview(
        this.parkingId,
        index * 2
      ).subscribe(res => {
          this.updateReviews();
      });
    }
  }

}


