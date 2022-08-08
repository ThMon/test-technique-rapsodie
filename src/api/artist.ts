import axios from "axios";
import { changeHandler } from "../lib/utils";
import {
  ArtistQuery,
  CompleteArtistQuery,
  MetricArtistQuery,
} from "../types/artist-types";

export const getArtistsWithCompleteData = async (): Promise<
  CompleteArtistQuery[] | null
> => {
  const csvFileArtists = await axios.get("/data/artist.csv");
  const resArtists = changeHandler(csvFileArtists.data);
  let artists: ArtistQuery[] = [];

  if (resArtists !== undefined) {
    artists = resArtists.data as ArtistQuery[];

    if (artists.length > 0) {
      const csvFileMetricsArtists = await axios.get("/data/artist_metric.csv");
      const resMetricsArtists = changeHandler(csvFileMetricsArtists.data);
      let metricsArtists: MetricArtistQuery[] = [];

      if (resMetricsArtists !== undefined) {
        metricsArtists = resMetricsArtists.data as MetricArtistQuery[];

        const completeArtists = artists.map((artist) => {
          const metrics = metricsArtists.filter(
            (metric) => +metric.artist_id === +artist.id
          );

          return {
            ...artist,
            metrics,
          };
        });

        if (completeArtists !== undefined) {
          return completeArtists;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getArtistWithCompleteData = async (
  artist_id: number
): Promise<CompleteArtistQuery | null> => {
  const csvFileArtists = await axios.get("/data/artist.csv");
  const resArtists = changeHandler(csvFileArtists.data);
  let artist: CompleteArtistQuery;

  if (resArtists !== undefined) {
    const artists = resArtists.data as ArtistQuery[];
    const findArtist = artists.find((a) => +a.id === +artist_id);
    if (findArtist !== undefined) {
      const csvFileMetricsArtists = await axios.get("/data/artist_metric.csv");
      const resMetricsArtists = changeHandler(csvFileMetricsArtists.data);
      let metricsArtist: MetricArtistQuery[];

      if (resMetricsArtists !== undefined) {
        const metricsArtists = resMetricsArtists.data as MetricArtistQuery[];
        const findMetrics = metricsArtists.filter(
          (metric) => +metric.artist_id === +findArtist.id
        );

        if (findMetrics !== undefined) {
          metricsArtist = findMetrics;
          artist = {
            ...findArtist,
            metrics: metricsArtist,
          };

          return artist;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};
