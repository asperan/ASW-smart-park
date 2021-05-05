db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "salt"],
      properties: {
        email: {
          bsonType: "string",
          description: "must be a valid email: ([]{64})@(<domain>) and it is required"
        },
        password: {
          bsonType: "string",
          description: "must be a string of an hashed and salted password, it is required"
        },
        salt: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
});