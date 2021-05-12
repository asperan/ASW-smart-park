db.cities.insertMany([{
        "name": "cesena",
        "longitude": NumberDecimal("44.1390945"),
        "latitude": NumberDecimal("12.2429281"),
        "parkings": [
            {
                "capacity": NumberInt(20),
                "occupancy": NumberInt(0),
                "longitude": NumberDecimal("44.147660"),
                "latitude": NumberDecimal("12.236731")
            },
            {
                "capacity": NumberInt(50),
                "occupancy": NumberInt(5),
                "longitude": NumberDecimal("44.144281"),
                "latitude": NumberDecimal("12.238529")
            },
            {
                "capacity": NumberInt(50),
                "occupancy": NumberInt(5),
                "longitude": NumberDecimal("44.144281"),
                "latitude": NumberDecimal("12.238529")
            },
            {
                "capacity": NumberInt(100),
                "occupancy": NumberInt(100),
                "longitude": NumberDecimal("44.143680"),
                "latitude": NumberDecimal("12.247764")
            }
        ]
    },
    {
        "name": "rimini",
        "longitude": NumberDecimal("44.059444"),
        "latitude": NumberDecimal("12.568333"),
        "parkings": []
    }
]);