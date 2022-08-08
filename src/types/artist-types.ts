export interface ArtistQuery {
  id: number;
  name: string;
  image: string;
}

export interface MetricArtistQuery {
  id?: number;
  artist_id: number;
  date: string;
  revenue: number;
  salary: number;
}

export interface CompleteArtistQuery extends ArtistQuery {
  metrics: MetricArtistQuery[];
}
