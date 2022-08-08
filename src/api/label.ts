import axios from "axios";
import { changeHandler } from "../lib/utils";
import { LabelQuery } from "../types/label-types";

export const getLabels = (): Promise<LabelQuery[] | null> => {
  return axios
    .get("/data/label.csv")
    .then((csvFile) => {
      const res = changeHandler(csvFile.data);
      if (res !== undefined) {
        const labels = res.data as LabelQuery[];
        return labels;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
