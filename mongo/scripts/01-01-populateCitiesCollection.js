db.cities.insertMany([{
        "name": "cesena",
        "longitude": NumberDecimal("12.2429281"),
        "latitude": NumberDecimal("44.1390945"),
        "parkings": [{
                "id": NumberInt(1),
                "capacity": NumberInt(20),
                "occupancy": NumberInt(0),
                "longitude": NumberDecimal("12.236731"),
                "latitude": NumberDecimal("44.147660"),
                "parkingSpots": [{
                        "uid": NumberInt(1),
                        "occupied": true,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.147612"),
                        "longitude": NumberDecimal("12.236550"),
                    },
                    {
                        "uid": NumberInt(2),
                        "occupied": false,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.147564"),
                        "longitude": NumberDecimal("12.236589"),
                    }, {
                        "uid": NumberInt(3),
                        "occupied": false,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.147508"),
                        "longitude": NumberDecimal("12.236632"),
                    }, {
                        "uid": NumberInt(4),
                        "occupied": true,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.147432"),
                        "longitude": NumberDecimal("12.236699"),
                    }
                ],
                "detail": {
                    "name": "placeholder",
                    "address": "placeholder",
                    "type": "placeholder"
                },
                "pricing": [{
                    "days": "1111100",
                    "hours": "00000000111111111110000"
                }]
            },
            {
                "id": NumberInt(2),
                "capacity": NumberInt(50),
                "occupancy": NumberInt(45),
                "longitude": NumberDecimal("12.238529"),
                "latitude": NumberDecimal("44.144281"),
                "parkingSpots": [

                ],
                "detail": {
                    "name": "placeholder",
                    "address": "placeholder",
                    "type": "placeholder"
                },
                "pricing": [{
                    "days": "1111100",
                    "hours": "00000000111111111110000"
                }]
            },
            {
                "id": NumberInt(4),
                "capacity": NumberInt(100),
                "occupancy": NumberInt(100),
                "longitude": NumberDecimal("12.247764"),
                "latitude": NumberDecimal("44.143680"),
                "parkingSpots": [

                ],
                "detail": {
                    "name": "placeholder",
                    "address": "placeholder",
                    "type": "placeholder"
                },
                "pricing": [{
                    "days": "1111100",
                    "hours": "00000000111111111110000"
                }]
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