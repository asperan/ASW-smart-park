db.createCollection("cities", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["id", "name", "longitude", "latitude"],
        properties: {
          id: {
            bsonType: "int",
            description: "Unique ID for referencing, required"
          },
          name: {
            bsonType: "string",
            description: "English name of a city, required"
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
  