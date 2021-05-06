import { CityModel } from "../models/city-model";

export type CityDto = {
    id: number,
    name: string
};

export function DtoFromModel(city: CityModel): CityDto {
    return { id: city.id, name: city.name };
}