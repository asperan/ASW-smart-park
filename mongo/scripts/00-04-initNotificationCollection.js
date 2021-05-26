db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["date", "addressees", "message", "senderReference"],
      properties: {
        date: {
          bsonType: "date",
          description: "the date-time when the notification is sent. It is required"
        },
        addressees: {
          bsonType: "array",
          description: "the list of addresees",
          items: {
            bsonType: "string",
            description: "an existing user email"
          }
        },
        message: {
          bsonType: "string",
          description: "The message of the notification",
        },
        senderReference: {
          bsonType: "string",
          description: "A reference to the sender"
        }
      }
    }
  }
});

db.notifications.createIndex({ addressees: 1, date: -1 });
