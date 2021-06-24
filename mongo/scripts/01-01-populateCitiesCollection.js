db.cities.insertMany([{
        "name": "cesena",
        "longitude": NumberDecimal("12.2429281"),
        "latitude": NumberDecimal("44.1390945"),
        "parkings": [{
                "id": NumberInt(1),
                "longitude": NumberDecimal("12.236731"),
                "latitude": NumberDecimal("44.147660"),
                "parkingSpots": [{
                        "uid": "ces-bac-1",
                        "occupied": true,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.147612"),
                        "longitude": NumberDecimal("12.236550"),
                    },
                    {
                        "uid": "ces-bac-2",
                        "occupied": false,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.147564"),
                        "longitude": NumberDecimal("12.236589"),
                    }, {
                        "uid": "ces-bac-3",
                        "occupied": false,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.147508"),
                        "longitude": NumberDecimal("12.236632"),
                    }, {
                        "uid": "ces-bac-4",
                        "occupied": true,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.147432"),
                        "longitude": NumberDecimal("12.236699"),
                    }
                ],
                "detail": {
                    "name": "Parcheggio Campus Cesena",
                    "address": "Via Riccardo Bacchelli, 47522 Cesena FC",
                    "type": "Open Park",
                    "imageUrl": "http://www.parkingroma.it/wp-content/uploads/2016/02/strisce-blu.jpg"
                },
                "pricing": {
                    "days": "1111100",
                    "hours": "000000001111111111110000",
                    "price": NumberDecimal("1.20")
                }
            },
            {
                "id": NumberInt(2),
                "longitude": NumberDecimal("12.238529"),
                "latitude": NumberDecimal("44.144281"),
                "parkingSpots": [
                    {
                        "uid": "ces-coop-1",
                        "occupied": true,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.14417894047117"),
                        "longitude": NumberDecimal("12.23827704587817"),
                    },
                    {
                        "uid": "ces-coop-2",
                        "occupied": true,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.144219359682005"),
                        "longitude": NumberDecimal("12.238360194364665"),
                    },
                    {
                        "uid": "ces-coop-3",
                        "occupied": true,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.14405190848791"),
                        "longitude": NumberDecimal("12.238411156334674"),
                    },
                    {
                        "uid": "ces-coop-4",
                        "occupied": false,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.14412504814833"),
                        "longitude": NumberDecimal("12.238593546543132"),
                    }
                ],
                "detail": {
                    "name": "Ipercoop",
                    "address": "Via Arturo Carlo Jemolo, 460, 47522 Cesena FC",
                    "type": "supermarket park",
                    "imageUrl": "https://www.foodweb.it/wp-content/uploads/2021/03/ingresso.jpg"
                },
                "pricing": {
                    "days": "1111111",
                    "hours": "111111111111111111111111",
                    "price": NumberDecimal("2.20")
                }
            },
            {
                "id": NumberInt(3),
                "longitude": NumberDecimal("12.247764"),
                "latitude": NumberDecimal("44.143680"),
                "parkingSpots": [
                    {
                        "uid": "ces-moro-1",
                        "occupied": true,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.14376845259572"),
                        "longitude": NumberDecimal("12.247912344684712"),
                    },
                    {
                        "uid": "ces-moro-2",
                        "occupied": true,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.14350751909258"),
                        "longitude": NumberDecimal("12.247882441584263"),
                    }
                ],
                "detail": {
                    "name": "Piazza A. Moro",
                    "address": "Piazza Aldo Moro, 47522 Cesena FC",
                    "type": "open park"
                },
                "pricing": {
                    "days": "1111100",
                    "hours": "000000001111111111110000",
                    "price": NumberDecimal("0.50")
                }
            }
        ]
    },
    {
        "name": "rimini",
        "longitude": NumberDecimal("12.568333"),
        "latitude": NumberDecimal("44.059444"),
        "parkings": [
            {
                "id": NumberInt(4),
                "longitude": NumberDecimal("12.575013443421387"),
                "latitude": NumberDecimal("44.07618528605304"),
                "parkingSpots": [
                    {
                        "uid": "rim-port-1",
                        "occupied": true,
                        "paidFor": true,
                        "latitude": NumberDecimal("44.07653900099871"),
                        "longitude": NumberDecimal("12.575080403801849"),
                    },
                    {
                        "uid": "rim-port-2",
                        "occupied": false,
                        "paidFor": false,
                        "latitude": NumberDecimal("44.07604662921078"),
                        "longitude": NumberDecimal("12.574938605342222"),
                    }
                ],
                "detail": {
                    "name": "Rimini Porto",
                    "address": "Via Destra Del Porto, 12, Rimini RN, 47923",
                    "type": "open park"
                },
                "pricing": {
                    "days": "1111100",
                    "hours": "000000001111111111110000",
                    "price": NumberDecimal("0.50")
                }
            }
        ]
    }
]);