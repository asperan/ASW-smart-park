import { mongoClient } from "../services/mongo-client";

export type ReviewEntity = {
    parkingId: number,
    userEmail: string,
    rating: number
}

export class ReviewsRepository {

    public async addReview(parkingId: number, userEmail: string, rating: number) {
        const collection = mongoClient.db.collection("reviews");
        const review: ReviewEntity = {
            parkingId: parkingId,
            userEmail: userEmail,
            rating: rating
        }
        return await collection.insertOne(review);
    }
    
    public async updateReview(parkingId: number, userEmail: string, rating: number) {
        const collection = mongoClient.db.collection("reviews");
        return await collection.updateOne({
            parkingId: parkingId,
            userEmail: userEmail
        }, {$set: {rating: rating}});
    }
    
    public async getReviewForParking(parkingId: number, userEmail: string): Promise<ReviewEntity> {
        const collection = mongoClient.db.collection("reviews");
        const review = await collection.findOne({
            parkingId: parkingId,
            userEmail: userEmail,
        }); 
        return review;
    }
    
    public async getReviewsForParking(parkingId: number): Promise<ReviewEntity[]> {
        const collection = mongoClient.db.collection("reviews");
        const reviews = await collection.find({
            parkingId: parkingId
        }).toArray(); 
        return reviews;
    }
    

}

export const reviewsRepository = new ReviewsRepository();

