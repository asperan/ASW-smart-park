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
            required: ["id", "capacity", "occupancy", "longitude", "latitude", "detail", "pricing"],
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
                required: ["uid", "occupied", "paidFor", "longitude", "latitude"],
                items: {
                  uid: {
                    bsonType: "int",
                    description: "parking spot ID unique globally across application",
                  },
                  occupied: {
                    bsonType: "bool",
                    description: "true if parking spot is occupied, false otherwise"
                  },
                  paidFor: {
                    bsonType: "bool",
                    description: "true if parking spot is paid for, false otherwise"
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
              },
              detail: {
                bsonType: "object",
                required: ["name", "address", "type"],
                properties: {
                  name: {
                    bsonType: "string",
                    description: "Parking name"
                  },
                  address: {
                    bsonType: "string",
                    description: "Parking area address, es. Via Monte Verdi, Rimini (RN), 47923"
                  },
                  type: {
                    bsonType: "string",
                    description: "Parking type description, es. 'Road side', 'Covered', 'Free'"
                  },
                  imageUrl: {
                    bsonType: "string",
                    description: "A facoltative url to the thumbnal image"
                  }
                }
              },
              pricing: {
                bsonType: "object",
                requred: ["days", "hours", "price"],
                properties: {
                  days: {
                    bsonType: "string",
                    description: "Bit mask that describes in what days the pricing is applicable, es. Mon-Fri = 1111100"
                  },
                  hours: {
                    bsonType: "string",
                    description: "Bit mask that describes in what hours of the day (24) the pricing is applicable. es. 08-20 = 00000000111111111110000"
                  },
                  price: {
                    bsonType: "decimal",
                    description: "Price per hour"
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