db.createCollection("payments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userEmail", "parkingId", "date", "amount", "pending"],
      properties: {
        userEmail: {
          bsonType: "string",
          description: "must be an existing user email"
        },
        parkingId: {
          bsonType: "string",
          description: "must be an existing parking id"
        },
        date: {
          bsonType: "date",
          description: "the timestamp when the payment has been requested"
        },
        amount: {
          bsonType: "int",
          description: "the amount to pay in cents"
        },
        pending: {
          bsonType: "boolean",
          description: "whether the payment is waiting the exit of the user from the parking"
        }
      }
    }
  }
});

db.payments.createIndex({ userEmail: 1 });
