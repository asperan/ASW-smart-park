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
            required: ["id", "capacity", "occupancy", "longitude", "latitude"],
            properties: {
              id: {
                bsonType: "int",
                description: "Unique parking ID",
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
              },
              parkingSpots: {
                bsonType: "array",
                required: ["id", "occupied", "longitude", "latitude"],
                items: {
                  id: {
                    bsonType: "int",
                    description: "parking spot ID unique to its parent",
                  },
                  occupied: {
                    bsonType: "bool",
                    description: "true if parking spot is occupied, false otherwise"
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
    }
  }
});