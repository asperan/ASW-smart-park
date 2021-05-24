db.cities.insertMany([{
        "name": "cesena",
        "longitude": NumberDecimal("12.2429281"),
        "latitude": NumberDecimal("44.1390945"),
        "parkings": [
            {
                "id": NumberInt(1),
                "capacity": NumberInt(20),
                "occupancy": NumberInt(0),
                "longitude": NumberDecimal("12.236731"),
                "latitude": NumberDecimal("44.147660")
            },
            {
                "id": NumberInt(2),
                "capacity": NumberInt(50),
                "occupancy": NumberInt(45),
                "longitude": NumberDecimal("12.238529"),
                "latitude": NumberDecimal("44.144281")
            },
            {
                "id": NumberInt(4),
                "capacity": NumberInt(100),
                "occupancy": NumberInt(100),
                "longitude": NumberDecimal("12.247764"),
                "latitude": NumberDecimal("44.143680")
            }
        ]
    },
    {
        "name": "rimini",
        "longitude": NumberDecimal("12.568333"),
        "latitude": NumberDecimal("44.059444"),
        "parkings": []
    }
]);