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
        },
        linkedVehicles: {
          bsonType: "array",
          description: "the list of linked vehicles, it is required",
          items: {
            bsonType: "object",
            required: ["vehicleId", "name"],
            properties: {
              vehicleId: {
                bsonType: "string",
                description: "the id of the vehicle"
              },
              name: {
                bsonType: "string",
                description: "the user-given name of the vehicle"
              }
            }
          }
        }
      }
    }
  }
});