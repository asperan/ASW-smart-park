import { mongoClient } from "../services/mongo-client";

export type ReviewEntity = {
    parkingId: number,
    userEmail: string,
    rating: number
}

export async function addReview(parkingId: number, userEmail: string, rating: number) {
    const collection = mongoClient.db.collection("reviews");
    const review: ReviewEntity = {
        parkingId: parkingId,
        userEmail: userEmail,
        rating: rating
    }
    return await collection.insertOne(review);
}

export async function getReviewForParking(parkingId: number, userEmail: string): Promise<ReviewEntity> {
    const collection = mongoClient.db.collection("reviews");
    const review = await collection.findOne({
        parkingId: parkingId,
        userEmail: userEmail,
    }); 
    return review;
}

export async function getReviewsForParking(parkingId: number): Promise<ReviewEntity[]> {
    const collection = mongoClient.db.collection("reviews");
    const reviews = await collection.find({
        parkingId: parkingId
    }).toArray(); 
    return reviews;
}


