import { CityEntity } from "../../repositories/cities-repository";

export const citiesStub: CityEntity[] = [{
    name: "cesena",
        longitude: 12.2429281,
        latitude: 44.1390945,
        parkings: [{
                id: 1,
                longitude: 12.236731,
                latitude: 44.147660,
                parkingSpots: [{
                        uid: "ces-bac-1",
                        occupied: true,
                        paidFor: true,
                        latitude: 44.147612,
                        longitude: 12.236550,
                    },
                    {
                        uid: "ces-bac-2",
                        occupied: false,
                        paidFor: true,
                        latitude: 44.147564,
                        longitude: 12.236589,
                    }, {
                        uid: "ces-bac-3",
                        occupied: false,
                        paidFor: false,
                        latitude: 44.147508,
                        longitude: 12.236632,
                    }, {
                        uid: "ces-bac-4",
                        occupied: true,
                        paidFor: false,
                        latitude: 44.147432,
                        longitude: 12.236699,
                    }
                ],
                detail: {
                    name: "Cesena",
                    address: "Via Riccardo Bacchelli, 47522 Cesena FC",
                    type: "Open Park",
                    imageUrl: "http://www.parkingroma.it/wp-content/uploads/2016/02/strisce-blu.jpg"
                },
                pricing: {
                    days: "1111100",
                    hours: "000000001111111111110000",
                    price: 1.20
                }
            },
            {
                id: 2,
                longitude: 12.238529,
                latitude: 44.144281,
                parkingSpots: [

                ],
                detail: {
                    name: "placeholder",
                    address: "placeholder",
                    type: "placeholder"
                },
                pricing: {
                    days: "1111100",
                    hours: "000000001111111111110000",
                    price: 1.20
                }
            },
            {
                id: 4,
                longitude: 12.247764,
                latitude: 44.143680,
                parkingSpots: [

                ],
                detail: {
                    name: "placeholder",
                    address: "placeholder",
                    type: "placeholder"
                },
                pricing: {
                    days: "1111100",
                    hours: "000000001111111111110000",
                    price: 1.20
                }
            }
        ]
    },
    {
        name: "rimini",
        longitude: 12.568333,
        latitude: 44.059444,
        parkings: []
    }
];