db.createCollection("vehicles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id"],
      properties: {
        id: {
          bsonType: "string",
          description: "must be a unique id and it is required"
        },
        userEmail: {
          bsonType: "string",
          description: "must be an existing user email, if present"
        },
        parkingId: {
          bsonType: "string",
          description: "must be an existing parking id, if present"
        }
      }
    }
  }
});

db.vehicles.createIndex({ id: 1 });