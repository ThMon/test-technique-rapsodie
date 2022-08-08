import React, { ReactElement, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { getLeagues } from "../../api/league";
import { selectLeague, setLeagues } from "../redux/league/leagueReducer";
import { LeagueQuery } from "../../types/league-types";
import { selectLabel, setLabels } from "../redux/label/labelReducer";
import { getLabels } from "../../api/label";
import { LabelQuery } from "../../types/label-types";
import { getProfits } from "../../api/profit";
import { ProfitQuery } from "../../types/profit-types";
import { setProfits } from "../redux/profit/profitReducer";
import { getCompleteSignatures } from "../../api/signature";
import { setSignatures } from "../redux/signature/signatureReducer";

const HocManager = ({ children }: { children: ReactElement }): ReactElement => {
  const { leagues } = useAppSelector((state) => state.league);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (leagues.length === 0) {
      getLeagues().then(async (res) => {
        const resLeagues = res as LeagueQuery[];
        dispatch(setLeagues(resLeagues));
        if (resLeagues.length > 0) {
          dispatch(selectLeague(resLeagues[0]));
          getLabels().then((response) => {
            const resLabels = response as LabelQuery[];
            dispatch(setLabels(resLabels));
            if (resLabels.length > 0) {
              const selectedLabel = resLabels.find(
                (label) => label.league_id === resLeagues[0].id
              );
              if (selectedLabel !== undefined) {
                dispatch(selectLabel(selectedLabel));
                getProfits().then((data) => {
                  const resProfits = data as ProfitQuery[];
                  dispatch(setProfits(resProfits));
                });
              }
            }
          });
        }

        getCompleteSignatures().then((res) => {
          if (res !== null) {
            dispatch(setSignatures(res));
          }
        });
      });
    }
  }, []);

  return <>{children}</>;
};

export default HocManager;
