import { reviewsRepository } from "../repositories/reviews-repository"
import { ReviewEntity } from "../repositories/reviews-repository";

export class ReviewsService {

  public async updateReview(parkingId: number, userEmail: string, rating: number): Promise<boolean> {
    const review = await reviewsRepository.getReviewForParking(parkingId, userEmail);
    rating = this.squashRating(rating);
    if (!review) {
      await reviewsRepository.addReview(parkingId, userEmail, rating);
      return true;
    } else {
      await reviewsRepository.updateReview(parkingId, userEmail, rating);
      return true;
    }
  }

  private squashRating(rating: number): number {
    if (rating < 0) {
      return 0;
    } else if (rating > 10) {
      return 10;
    } else {
      return rating;
    }
  }

  public async getReviewForParking(parkingId: number, userEmail: string): Promise<ReviewEntity> {
    const review = await reviewsRepository.getReviewForParking(parkingId, userEmail);
    if (review) {
      return review;
    } else {
      throw new Error("No review found");
    }
  }

  public async getReviewsForParking(parkingId: number): Promise<ReviewEntity[]> {
    const reviews = await reviewsRepository.getReviewsForParking(parkingId);
    if (reviews) {
      return reviews;
    } else {
      throw new Error("No reviews found");
    }
  }

}

export const reviewsService = new ReviewsService();