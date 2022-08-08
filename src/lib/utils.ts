import Papa from "papaparse";
import moment from "moment";
import { ProfitQuery } from "../types/profit-types";

export const changeHandler = (csvFile: string) => {
  return Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: function (results: any) {
      return results.data;
    },
  });
};

export const filterProfitByDateAndLabel = (
  profits: ProfitQuery[],
  startDate: string,
  endDate: string,
  label_id: number
): ProfitQuery[] => {
  return profits.filter((profit) => {
    return (
      moment(profit.date) >= moment(startDate) &&
      moment(profit.date) <= moment(endDate) &&
      +profit.label_id === +label_id
    );
  });
};

export const filterProfitByLabel = (
  profits: ProfitQuery[],
  label_id: number
): ProfitQuery[] => {
  return profits.filter((profit) => {
    return +profit.label_id === +label_id;
  });
};
