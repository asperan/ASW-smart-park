db.createCollection("parkings", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "cityId", "maxOccupancy", "currentOccupancy", "longitude", "latitude"],
        properties: {
          id: {
            bsonType: "int",
            description: "Unique ID for referencing, required"
          },
          cityId: {
            bsonType: "int",
            description: "References parent city, required"
          },
          capacity: {
            bsonType: "int",
            description: "Maximum number of parked cars allowed",
          },
          occupancy: {
            bsonType: "int",
            description: "Current number of parked cars",
          },
          longitude: {
            bsonType: "decimal",
            description: "geographical longitude in Decimal degrees (DD) format, required"
          },
          latitude: {
            bsonType: "decimal",
            description: "geographical longitude in Decimal degrees (DD) format, required"
          }
        }
      }
    }
  });
  