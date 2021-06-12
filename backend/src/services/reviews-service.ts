import * as reviewsRepository from "../repositories/reviews-repository"
import { ReviewEntity } from "../repositories/reviews-repository";

export async function updateReview(parkingId: number, userEmail: string, rating: number): Promise<boolean> {
    const review = await reviewsRepository.getReviewForParking(parkingId, userEmail);
    rating = squashRating(rating);
    if(!review) {
        await reviewsRepository.addReview(parkingId, userEmail, rating);
        return true;
    } else {
        await reviewsRepository.updateReview(parkingId, userEmail, rating);
        return true;
    }
}

function squashRating(rating: number): number {
    if(rating < 0) {
        return 0;
    } else if(rating > 10) {
        return 10;
    } else {
        return rating;
    }
}

export async function getReviewForParking(parkingId: number, userEmail: string): Promise<ReviewEntity> {
    return await reviewsRepository.getReviewForParking(parkingId, userEmail);
}

export async function getReviewsForParking(parkingId: number): Promise<ReviewEntity[]> {
    return await reviewsRepository.getReviewsForParking(parkingId);
}
