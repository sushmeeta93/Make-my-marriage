export type PlaceSuggestion = {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
};

export interface PlacesService {
  search(query: string): Promise<PlaceSuggestion[]>;
}

export class PlacesServiceNotConfigured implements PlacesService {
  async search(): Promise<PlaceSuggestion[]> {
    throw new Error("Places service is not configured.");
  }
}
