import { ReviewEntity } from "../repositories/reviews-repository";
import * as reviewsService from "../services/reviews-service";

export async function addReview(parkingId: number, userEmail: string, rating: number): Promise<boolean> {
    return await reviewsService.addReview(parkingId, userEmail, rating);
}

export async function getUserReview(parkingId: number, userEmail: string): Promise<ReviewEntity> {
    const review = await reviewsService.getReviewForParking(parkingId, userEmail);
    return makeDtoFromEntity(review);
}

export async function getAllReviews(parkingId: number): Promise<ReviewEntity[]> {
    const reviews = await reviewsService.getReviewsForParking(parkingId);
    return reviews.map(review => makeDtoFromEntity(review));
}

function makeDtoFromEntity(entity: ReviewEntity) {
    return {
        parkingId: entity.parkingId,
        userEmail: entity.userEmail,
        rating: entity.rating
    }
}