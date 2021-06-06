db.createCollection("messages", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["type", "isSent", "receiver", "sender", "subject", "body"],
            properties: {
                type: {
                    bsonType: "string",
                    description: "Describes the type of a message, es. email"
                },
                isSent: {
                    bsonType: "bool",
                    description: "Indicates if a message is sent"
                },
                receiver: {
                    bsonType: "string",
                    description: "Message's receiver"
                },
                sender: {
                    bsonType: "string",
                    description: "Message's sender"
                },
                subject: {
                    bsonType: "string",
                    description: "Message's subject"
                },
                body: {
                    bsonType: "string",
                    description: "Message's body"
                }
            }
        }
    }
});