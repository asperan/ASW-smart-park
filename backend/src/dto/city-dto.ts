import { City } from "../models/city-model";

export class CityDto {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromModel(city: City): CityDto {
        return new CityDto(city.id, city.name);
    }
}