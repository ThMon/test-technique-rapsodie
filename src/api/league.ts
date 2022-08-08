import axios from "axios";
import { changeHandler } from "../lib/utils";
import { LeagueQuery } from "../types/league-types";

export const getLeagues = (): Promise<LeagueQuery[] | null> => {
  return axios
    .get("/data/league.csv")
    .then((csvFile) => {
      const res = changeHandler(csvFile.data);
      if (res !== undefined) {
        const leagues = res.data as LeagueQuery[];
        return leagues;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
