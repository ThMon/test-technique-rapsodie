import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../lib/redux/hook";
import { selectLeague } from "../../lib/redux/league/leagueReducer";
import { selectLabel } from "../../lib/redux/label/labelReducer";

import styled from "styled-components";

const Nav = styled.nav`
  background-color: black;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CustomLink = styled.span`
  color: ${(props) => props.color};
  font-size: 1em;
  text-decoration: none;
`;

export default function Header(): ReactElement {
  const leagues = useAppSelector((state) => state.league.leagues);
  const { labels, selectedLabel } = useAppSelector((state) => state.label);
  const dispatch = useAppDispatch();

  return (
    <Nav>
      <>
        <Link to="/">
          <CustomLink color="white">Accueil</CustomLink>
        </Link>
        <Link to="/label">
          <CustomLink color="white">Label</CustomLink>
        </Link>
        <Link to="/signature">
          <CustomLink color="white">Signatures</CustomLink>
        </Link>
        <Link to="/chemar">
          <CustomLink color="white">Chémar</CustomLink>
        </Link>
      </>
      <>
        <select
          onChange={(e) => {
            const newSelectedLeague = leagues.find(
              (league) => +league.id === +e.target.value
            );
            if (newSelectedLeague !== undefined) {
              dispatch(selectLeague(newSelectedLeague));
              const newSelectedLabel = labels.find(
                (label) => +label.id === +newSelectedLeague.id
              );
              if (newSelectedLabel !== undefined) {
                dispatch(selectLabel(newSelectedLabel));
              }
            }
          }}
        >
          {leagues.map((league) => {
            return (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            );
          })}
        </select>
      </>
      {selectedLabel !== null && (
        <>
          <CustomLink color="white">cash : {selectedLabel.funds} €</CustomLink>
        </>
      )}
    </Nav>
  );
}
