db.createCollection("parkingstays", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userEmail", "vehicleId", "parkingSpotId", "entryDate", "payedUntil"],
      properties: {
        userEmail: {
          bsonType: "string",
          description: "must be an existing user email"
        },
        vehicleId: {
          bsonType: "string",
          description: "must be a user vehicle"
        },
        parkingSpotId: {
          bsonType: "string",
          description: "must be an existing parking id"
        },
        entryDate: {
          bsonType: "date",
          description: "the timestamp when the user payed the parking spot"
        },
        exitDate: {
          bsonType: "date",
          description: "the timestamp when the user left the parking spot"
        },
        payedUntil: {
          bsonType: "date",
          description: "the timestamp when the parking booking ends"
        },
        payment: {
          bsonType: "object",
          required: ["paymentId", "amount"],
          properties: {
            paymentId: {
              bsonType: "string",
              description: "the payment identifier"
            },
            amount: {
              bsonType: "int",
              description: "the amount payed in cents"
            }
          }
        }
      }
    }
  }
});

db.parkingstays.createIndex({ userEmail: 1, entryDate: -1, vehicleId: 1, parkingSpotId: 1 });