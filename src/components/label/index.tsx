import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "../../lib/redux/hook";
import { ProfitQuery } from "../../types/profit-types";
import { filterProfitByDateAndLabel } from "../../lib/utils";
import moment from "moment";
import {
  CustomTable,
  CustomThead,
  CustomTr,
  CustomTd,
} from "../../style/table";
import "moment/locale/fr";
moment.locale("fr");

const Label = (): ReactElement => {
  const { selectedLabel } = useAppSelector((state) => state.label);
  const { profits } = useAppSelector((state) => state.profit);
  const [startDate, setStartDate] = useState<string>("2022-01-01");
  const [endDate, setEndDate] = useState<string>("2022-06-01");
  const [filteredProfits, setFilteredProfits] = useState<ProfitQuery[]>([]);

  useEffect(() => {
    if (profits.length > 0) {
      setStartDate(profits[0].date);
      setEndDate(profits[profits.length - 1].date);
      if (selectedLabel !== null) {
        setFilteredProfits(
          filterProfitByDateAndLabel(
            profits,
            profits[0].date,
            profits[profits.length - 1].date,
            selectedLabel.id
          )
        );
      }
    }
  }, [profits]);

  useEffect(() => {
    if (selectedLabel !== null) {
      setFilteredProfits(
        filterProfitByDateAndLabel(
          profits,
          startDate,
          endDate,
          selectedLabel.id
        )
      );
    }
  }, [startDate, endDate, selectedLabel]);

  return (
    <>
      {selectedLabel !== null && (
        <>
          <h1>Mon label</h1>
          <h2>{selectedLabel.name}</h2>
          <p>Argent dispo : {selectedLabel.funds} €</p>
          <div className="m-b-15">
            <label>Date de début : </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Date de fin : </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          <div>
            <CustomTable width="600">
              <thead>
                <tr>
                  <CustomThead>Date</CustomThead>
                  <CustomThead>Profit</CustomThead>
                </tr>
              </thead>
              <tbody>
                {filteredProfits.map((profit) => {
                  return (
                    <CustomTr key={profit.id}>
                      <CustomTd>{moment(profit.date).format("L")}</CustomTd>
                      <CustomTd>{(+profit.daily_profit).toFixed(2)} €</CustomTd>
                    </CustomTr>
                  );
                })}
              </tbody>
            </CustomTable>
          </div>
        </>
      )}
    </>
  );
};

export default Label;
