import React, { ReactElement, useState, useEffect } from "react";
import { getArtistsWithCompleteData } from "../../api/artist";
import { CompleteArtistQuery } from "../../types/artist-types";
import { Link } from "react-router-dom";
import {
  CustomTable,
  CustomThead,
  CustomTr,
  CustomTd,
} from "../../style/table";
import moment from "moment";

type ArtistSalaryQuery = { detail: CompleteArtistQuery; todaySalary: number };

const Chemar = (): ReactElement => {
  const [date, setDate] = useState("2022-07-28");
  const [artists, setArtists] = useState<ArtistSalaryQuery[]>([]);

  const changeOrderArtists = (artists: CompleteArtistQuery[]) => {
    const resArtists = artists.map((artist) => {
      const todayMetrics = artist.metrics.find(
        (metric) => metric.date === date
      );
      if (todayMetrics !== undefined) {
        return { detail: artist, todaySalary: +todayMetrics.salary };
      } else {
        return { detail: artist, todaySalary: 0 };
      }
    });

    resArtists.sort(function compare(a, b) {
      if (a !== undefined && b !== undefined) {
        if (a.todaySalary > b.todaySalary) return -1;
        if (a.todaySalary < b.todaySalary) return 1;
      }
      return 0;
    });

    if (resArtists !== undefined) {
      setArtists(resArtists);
    }
  };

  useEffect(() => {
    getArtistsWithCompleteData().then((res) => {
      if (res !== null) {
        changeOrderArtists(res);
      }
    });
  }, []);

  useEffect(() => {
    const changeArtists = artists.map((artist) => artist.detail);
    changeOrderArtists(changeArtists);
  }, [date]);

  return (
    <>
      <h1>Chémar</h1>
      <div className="m-b-15">
        <label>Choisir votre jour de chémar: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>

      {artists.length > 0 &&
      moment(date) <= moment("2022-07-28") &&
      moment(date) >= moment("2022-05-30") ? (
        <CustomTable width="600">
          <thead>
            <tr>
              <CustomThead>Nom</CustomThead>
              <CustomThead>Salaire</CustomThead>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => {
              return (
                <tr>
                  <CustomTd>
                    <Link
                      key={artist.detail.id}
                      to={`/artiste/${artist.detail.id}`}
                    >
                      {artist.detail.name}
                    </Link>
                  </CustomTd>
                  <CustomTd>{artist.todaySalary} €</CustomTd>
                </tr>
              );
            })}
          </tbody>
        </CustomTable>
      ) : (
        <p>aucun résultats...</p>
      )}
    </>
  );
};

export default Chemar;
