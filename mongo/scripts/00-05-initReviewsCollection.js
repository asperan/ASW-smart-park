db.createCollection("reviews", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["parkingId", "userEmail", "rating"],
            properties: {
                parkingId: {
                    bsonType: "int",
                    description: "Parking unique id"
                },
                userEmail: {
                    bsonType: "string",
                    description: "User's unique id"
                },
                rating: {
                    bsonType: "int",
                    description: "Rating from 0 to 10 representd as 5 starts"
                }
            }
        }
    }
});