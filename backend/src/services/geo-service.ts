const R = 6371; // Radius of the earth in km

export type Coordinates = {
    longitude: number,
    latitude: number,
}


export function getDistanceFromLatLonInKm(coordinates1: Coordinates, coordinates2: Coordinates) {
    const lat1 = coordinates1.latitude;
    const lon1 = coordinates1.longitude
    const lat2 = coordinates2.latitude;
    const lon2 = coordinates2.longitude

    var dLat = degreesToRadiants(lat2 - lat1);
    var dLon = degreesToRadiants(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadiants(lat1)) * Math.cos(degreesToRadiants(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    
    return d;
}

function degreesToRadiants(deg: number) {
    return deg * (Math.PI / 180);
}
