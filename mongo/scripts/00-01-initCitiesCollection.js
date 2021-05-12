db.createCollection("cities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "longitude", "latitude"],
      properties: {
        name: {
          bsonType: "string",
          description: "English name of a city, lowercase, required"
        },
        longitude: {
          bsonType: "decimal",
          description: "geographical longitude in Decimal degrees (DD) format, required"
        },
        latitude: {
          bsonType: "decimal",
          description: "geographical longitude in Decimal degrees (DD) format, required"
        },
        parkings: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["capacity", "occupancy", "longitude", "latitude"],
            properties: {
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
      }
    }
  }
});