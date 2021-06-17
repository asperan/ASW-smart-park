import { mongoClient } from "../services/mongo-client";

export type PermanenceEntity = {
  startTime: date,
  endTime: date,
  parkingSpot_id: string,
  user_id: string
}
