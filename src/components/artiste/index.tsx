import React, { ReactElement, useEffect, useState } from "react";
import { getArtistWithCompleteData } from "../../api/artist";
import { useParams } from "react-router-dom";
import { CompleteArtistQuery } from "../../types/artist-types";
import styled from "styled-components";
import { global_colors } from "../../style/global_colors";

const Image = styled.img`
  width: 20%;
`;

const ArtistTitle = styled.h2`
  font-size: 1.3em;
  color: ${global_colors.titles_color};
`;

const CustomButton = styled("div")<{ selected: boolean }>`
  display: inline-block;
  padding: 10px 5px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? global_colors.titles_color : "transparent"};
  color: ${(props) => (props.selected ? "white" : global_colors.titles_color)};
  border: 2px solid ${global_colors.titles_color};
  margin: 10px 5px;
  border-radius: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Artiste = (): ReactElement => {
  const { id } = useParams();
  const [artist, setArtist] = useState<CompleteArtistQuery | null>(null);
  const [timeframe, setTimeframe] = useState<number>(1);
  const [salarySum, setSalarySum] = useState<number>(0);
  const [revenueSum, setRevenueSum] = useState<number>(0);

  useEffect(() => {
    if (id !== undefined) {
      getArtistWithCompleteData(+id).then((res) => {
        if (res !== null) {
          setArtist(res);
          calculateTimeframe(res, timeframe);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (artist !== null) {
      calculateTimeframe(artist, timeframe);
    }
  }, [timeframe]);

  const ButtonSelector = ({ value }: { value: number }) => {
    return (
      <CustomButton
        selected={value === timeframe}
        onClick={(e) => {
          setTimeframe(value);
        }}
      >
        {value === 1 ? "Aujourd'hui" : `les ${value} derniers jours`}
      </CustomButton>
    );
  };

  function calculateTimeframe(artist: CompleteArtistQuery, timeframe: number) {
    const selectedMetrics = artist.metrics.filter(
      (metric, index) =>
        index < artist.metrics.length &&
        index >= artist.metrics.length - timeframe
    );
    let sumSalary = 0;
    let sumRevenue = 0;

    for (const metric of selectedMetrics) {
      sumSalary += +metric.salary;
      sumRevenue += +metric.revenue;
    }

    setSalarySum(sumSalary);
    setRevenueSum(sumRevenue);
  }

  return (
    <>
      <h1>Artiste</h1>
      {artist !== null ? (
        <div>
          <Image src={artist.image} alt="" />
          <ArtistTitle>{artist.name}</ArtistTitle>
          <div>
            <h3>
              {timeframe === 1
                ? "Aujourd'hui le 28/07/2022"
                : `les ${timeframe} derniers jours`}
            </h3>
            <ButtonSelector value={1} />
            <ButtonSelector value={7} />
            <ButtonSelector value={30} />
          </div>
          <div>
            <p>Somme salaire : {salarySum} €</p>
            <p>Somme revenue : {revenueSum} €</p>
            <p>Somme des bénéfices: {revenueSum - salarySum} €</p>
          </div>
        </div>
      ) : (
        <p>artiste non trouvé</p>
      )}
    </>
  );
};

export default Artiste;
