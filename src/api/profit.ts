import axios from "axios";
import { changeHandler } from "../lib/utils";
import { ProfitQuery } from "../types/profit-types";

export const getProfits = (): Promise<ProfitQuery[] | null> => {
  return axios
    .get("/data/label_profit.csv")
    .then((csvFile) => {
      const res = changeHandler(csvFile.data);
      if (res !== undefined) {
        const profits = res.data as ProfitQuery[];
        return profits;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
