import { ReviewEntity, reviewsRepository, ReviewsRepository } from "../../repositories/reviews-repository";
import { ReviewsService } from "../../services/reviews-service";

const sinon = require("sinon");
const expect = require("chai").expect;

describe("ReviewsService test", function() {

    afterEach(function () {
        sinon.restore();
    });

    it("updateReview add review", function() {
        sinon.stub(ReviewsRepository.prototype, "getReviewForParking").returns(null);
        const reviewsService = new ReviewsService();

        expect(() => reviewsService.updateReview(1, "1234", 7)).to.not.throw();
    });

    it("updateReview update review", function() {
        sinon.stub(ReviewsRepository.prototype, "getReviewForParking").returns(review());
        const reviewsService = new ReviewsService();

        expect(() => reviewsService.updateReview(1, "1234", 7)).to.not.throw();
    });

    it("getReviewForParking", async function() {
        sinon.stub(ReviewsRepository.prototype, "getReviewForParking").returns(review());
        const reviewsService = new ReviewsService();
        
        const result = await reviewsService.getReviewForParking(1, "1234");

        expect(result).to.equal(reviewsStub[0]);
    });

    it("getReviewsForParking", async function() {
        sinon.stub(ReviewsRepository.prototype, "getReviewsForParking").returns(reviews());
        const reviewsService = new ReviewsService();
        
        const result = await reviewsService.getReviewsForParking(1);

        expect(result).to.equal(reviewsStub);
    });

});

function review(): Promise<ReviewEntity> {
    return new Promise(resolve => resolve(reviewsStub[0]));
}

function reviews(): Promise<ReviewEntity[]> {
    return new Promise(resolve => resolve(reviewsStub)); 
}

const reviewsStub: ReviewEntity[] = [
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