const R = 6371; // Radius of the earth in km

export type Coordinates = {
    longitude: number,
    latitude: number,
}

export class GeoService {
    constructor() {}
    
    public isPointInRadius(center: Coordinates, point: Coordinates, radiusKm: number): boolean {
        return this.getDistanceFromLatLonInKm(center, point) <= radiusKm;
    }
    
    
    public getDistanceFromLatLonInKm(coordinates1: Coordinates, coordinates2: Coordinates): number {
        const lat1 = coordinates1.latitude;
        const lon1 = coordinates1.longitude
        const lat2 = coordinates2.latitude;
        const lon2 = coordinates2.longitude
    
        var dLat = this.degreesToRadiants(lat2 - lat1);
        var dLon = this.degreesToRadiants(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadiants(lat1)) * Math.cos(this.degreesToRadiants(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        
        return d;
    }
    
    private degreesToRadiants(deg: number) {
        return deg * (Math.PI / 180);
    }

}

export const geoService: GeoService = new GeoService();
